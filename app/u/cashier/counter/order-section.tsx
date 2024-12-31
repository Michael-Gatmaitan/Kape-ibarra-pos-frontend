"use client";
import React, { SyntheticEvent, useDeferredValue, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { selectShowOrderSection, toggleShowOrderSection } from '../../../../lib/features/state/stateSlice';
import OrderItem from './order-section/OrderItem';
import { clearOrderItems, selectOrderItemsBody, selectTotalAmount } from '../../../../lib/features/order/orderSlice';
import { apiUrl } from '../../../../lib/apiUrl';
import { useToast } from '../../../../@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { Copy, X } from 'lucide-react';
import { IEWallet } from '../../../..';
import { getUserPayloadServer } from '../../../../actions/serverActions';
import { Card, CardContent, CardFooter } from '../../../../components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../../components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form';
import { Button } from '../../../../components/ui/button';
import { Label } from '../../../../components/ui/label';
import { Separator } from '../../../../components/ui/separator';
import { Input } from '../../../../components/ui/input';

import ViewProofOfPayment from './order-section/ViewProofOfPayment';

interface IOrderSectionProps {
  payload: Awaited<ReturnType<typeof getUserPayloadServer>>;
  token: string; ewallet: IEWallet;
}
const OrderSection = ({ payload, token, ewallet }: IOrderSectionProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const [lastCustomerNumber, setLastCustomerNumber] = useState(0);
  const [proofOfPaymentUploaded, setProofOfPaymentUploaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'cash'>('cash');
  const [diningOption, setDiningOption] = useState<'dine-in' | 'take-out'>('dine-in');
  const [totalTendered, setTotalTendered] = useState(0);
  const defferedTenderedAmount = useDeferredValue(totalTendered);
  const totalAmount = useAppSelector(selectTotalAmount);
  const showOrderSection = useAppSelector(selectShowOrderSection);
  const orderItems = useAppSelector(selectOrderItemsBody);

  useEffect(() => {
    const getLastCustomerNumber = async () => {
      const req = await fetch(`${apiUrl}/order?lastOrder=true`, {
        cache: 'no-cache',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        }
      });
      const result = await req.json();

      if (result.length !== 0) {
        setLastCustomerNumber(prev => {
          if (prev !== result[0].customerNumber) {
            return result[0].customerNumber + 1;
          }
        });
      } else {
        console.log("There's no last order");
      }
    }
    getLastCustomerNumber();

  }, [orderItems, token]);

  const form = useForm();

  const handleTotalTenderedChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    const intVal = parseInt(value);
    setTotalTendered(isNaN(intVal) ? 0 : intVal);
  };

  const handleCreateOrder = async () => {
    const mappedOrderItems = Object.keys(orderItems).map(key => {
      const { quantity, quantityAmount, productId } = orderItems[key];
      return {
        productId,
        quantity,
        quantityAmount
      };
    });

    let reqBody: { orderBody: { customerId: string; orderStatus: "payment pending" | "preparing"; orderType: "walk-in" | "online"; diningOption: "dine-in" | "take-out"; proofOfPaymentImg?: string; } | { employeeId: string; orderStatus: "payment pending" | "preparing"; orderType: "walk-in" | "online"; diningOption: "dine-in" | "take-out"; proofOfPaymentImg?: string; }; orderItemsBody: { productId: string; quantity: number; quantityAmount: number; }[]; transactionBody?: { change: number; totalAmount: number; totalTendered: number; paymentMethod: "gcash" | "cash"; }; };

    if (payload.roleName === 'customer') {
      reqBody = {
        orderBody: {
          customerId: payload.person.id,
          orderStatus: "payment pending",
          orderType: 'online',
          diningOption,
          proofOfPaymentImg: imageUrl
        },
        orderItemsBody: mappedOrderItems,
        // We dont have transactions for online
      }

    } else if (payload.roleName === 'admin' || payload.roleName === 'cashier') {
      reqBody = {
        orderBody: {
          employeeId: payload.person.id,
          orderStatus: "preparing",
          orderType: "walk-in",
          diningOption,
          proofOfPaymentImg: null
        },
        orderItemsBody: mappedOrderItems,
        transactionBody: {
          change: defferedTenderedAmount - totalAmount,
          totalAmount,
          totalTendered,
          paymentMethod,
        }
      };
    }

    if (!reqBody) {
      console.log("Request body from ordering is undefined!");
      alert("Request body from ordering is undefined!");
    }

    const req = await fetch(`${apiUrl}/order`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify(reqBody)
    });

    if (!req.ok) {
      console.log("There was a problem submitting order");
      toast({ variant: "destructive", title: "Order failed", description: "Kindly call the developers for reports.", })
      return;
    }

    const result = await req.json();
    console.log("Order in client: ", result);

    // Toast for submitting order
    toast({
      title: `Order #${result.customerNumber} successful`,
      description: "Your order has been recorded.",
    });

    setTotalTendered(0);
    dispatch(clearOrderItems());
  }

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleUploadImage = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    console.log(file, formData);

    const response = await fetch("/api/proof-of-payment", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("File uploaded successfully!");
      setProofOfPaymentUploaded(true);
    } else {
      console.error("File upload failed");
    }

    const result = await response.json();
    console.log(result);

    if (result.imagePath) {
      setImageUrl(result.imagePath);
      console.log(imageUrl);
    } else {
      alert("Something went wrong uplodaing image");
    }
  };

  return (
    // className='absolute md:static top-0 l-0 w-screen h-screen bg-black'
    <Card className={`
      w-full h-full z-50 p-4 top-0 left-0 rounded-none ${showOrderSection ? "grid" : "hidden"} fixed z-0
      md:w-full md:h-auto md:min-h-full md:static md:grid md:rounded-md grid-rows-orderSection overflow-auto no-scrollbar
      pt-[72px] md:pt-0
      `}>
      <Form {...form}>

        <div className="mb-2 flex justify-between md:justify-center items-center text-center text-xl font-bold md:text-2xl">
          <Button variant='outline' className="w-10 h-10 md:hidden" onClick={() => dispatch(toggleShowOrderSection())}>
            <X />
          </Button>
          <div>No. #{lastCustomerNumber}</div>
          <div className="w-10 h-10 md:hidden"></div>
        </div>
        <CardContent className='p-0 flex flex-col gap-2'>
          {Object.keys(orderItems).length <= 0 ? (
            <div className='pt-4 text-center'>No product selected.</div>
          ) : Object.keys(orderItems).map(productId => (
            <OrderItem orderItem={orderItems[productId]} key={productId} />
          ))}
        </CardContent>

        <CardFooter className='p-0 pt-14 grid'>
          <Separator />

          <div className='py-4 grid gap-2 w-full'>
            <div className="flex justify-between">
              <div className="font-medium text-lg">Total amount</div>
              <div className="font-medium text-lg">₱ {totalAmount}</div>
            </div>

            {/* total tendered */}
            {payload.roleName !== 'customer' ? (
              <>
                <div className="grid gap-1">
                  <div className="font-medium text-lg">Total tendered</div>
                  <Input type='number' min="0" max="100000" onChange={handleTotalTenderedChange} />
                </div>

                <div className="flex justify-between">
                  <div className="font-medium text-lg">Change</div>
                  <div className="font-medium text-lg">₱ {defferedTenderedAmount - totalAmount}</div>
                </div>
              </>
            ) : null}
          </div>

          <Separator />

          {payload.roleName === 'customer' ? (
            <React.Fragment>
              <div className="w-full py-4">
                <div className="font-medium text-lg">Gcash payment</div>
                <div className="flex gap-1">
                  <Copy className='w-6 h-6' />
                  <div className="grid gap-1">
                    <div className="font-medium">{ewallet.phoneNumber}</div>
                    <Label className="font-medium">{ewallet.name}</Label>
                  </div>
                </div>

                {/* <Form */}

                <FormField
                  // control={form.control}
                  name="productImage"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <FormLabel>Product image</FormLabel>
                      <FormControl>
                        <Input
                          // className="bg-neutral-900"
                          type="file"
                          // {...fieldProps}
                          accept="image/png, image/jpeg, image/jpg"

                          onChange={(event) => {
                            onChange(event.target.files && event.target.files[0])
                            console.log(event.target.files && event.target.files[0]);
                            setFile(event.target.files && event.target.files[0])
                          }
                          }
                        />
                      </FormControl>
                      <FormMessage />
                      {!!file ? <Button onClick={handleUploadImage}>Upload</Button> : null}
                    </FormItem>
                  )}
                />
                {imageUrl !== '' ? <ViewProofOfPayment imageUrl={imageUrl} type='preview' /> : null}
              </div>
              <Separator />
            </React.Fragment>
          ) : null}

          <div className="w-full flex gap-2 justify-between py-4">
            {payload.roleName !== 'customer' ? (
              <Select onValueChange={(e: typeof paymentMethod) => setPaymentMethod(e)} defaultValue={paymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem defaultChecked value="cash">Cash</SelectItem>
                  <SelectItem value="gcash">Gcash</SelectItem>
                </SelectContent>
              </Select>
            ) : null}

            <Select onValueChange={(e: typeof diningOption) => setDiningOption(e)} defaultValue={diningOption} >
              <SelectTrigger>
                <SelectValue placeholder="Select dining option" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem defaultChecked value="dine-in">Dine in</SelectItem>
                <SelectItem value="take-out">Take out</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant='outline' onClick={() => dispatch(clearOrderItems())}>
              Clear list
            </Button>
            <Button
              disabled={
                Object.keys(orderItems).length <= 0 ||
                (payload.roleName !== 'customer' ? (defferedTenderedAmount <= 0)
                  || (defferedTenderedAmount < totalAmount) :
                  !(payload.roleName === 'customer' && (imageUrl !== '' || proofOfPaymentUploaded)))
              }
              onClick={handleCreateOrder}
            >
              Place order
            </Button>
          </div>
        </CardFooter>

      </Form>
    </Card >
  )
}

export default OrderSection
