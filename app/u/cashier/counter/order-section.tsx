"use client";
import { EyeClosed } from 'lucide-react';
import React, { FormEvent, SetStateAction, useDeferredValue, useEffect, useState } from 'react'
import { Button } from '../../../../components/ui/button';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { selectShowOrderSection, toggleShowOrderSection } from '../../../../lib/features/state/stateSlice';
import { Card, CardContent, CardFooter } from '../../../../components/ui/card';
import OrderItem from './order-section/OrderItem';
import { clearOrderItems, selectOrderItemsBody, selectTotalAmount, selectTotalTendered, setTotalTendered } from '../../../../lib/features/order/orderSlice';
import { Separator } from '../../../../components/ui/separator';
import { Input } from '../../../../components/ui/input';
import { apiUrl } from '../../../../lib/apiUrl';
// import { getUserPayloadServer } from '../../../../actions/serverActions';
import { useUserPayload } from '../../../../lib/customHooks';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../../components/ui/select';
import { useToast } from '../../../../@/hooks/use-toast';

const OrderSection = () => {
  const showOrderSection = useAppSelector(selectShowOrderSection);
  const orderItems = useAppSelector(selectOrderItemsBody);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const payload = useUserPayload();

  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'cash'>('cash');
  const [diningOption, setDiningOption] = useState<'dine-in' | 'take-out'>('dine-in');

  const [totalTendered, setTotalTendered] = useState(0);

  const handleTotalTenderedChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    console.log(value === '');

    const intVal = parseInt(value);

    if (isNaN(intVal)) {
      setTotalTendered(0);
    } else {
      setTotalTendered(parseInt(value));
    }
  };

  const defferedTenderedAmount = useDeferredValue(totalTendered);

  const totalAmount = useAppSelector(selectTotalAmount);

  const handleCreateOrder = async () => {

    const mappedOrderItems = Object.keys(orderItems).map(key => {
      const { quantity, quantityAmount, productId } = orderItems[key];
      const orderBody = {
        productId,
        quantity,
        quantityAmount
      }
      return orderBody;
    });

    const reqBody = {
      orderBody: {
        employeeId: payload.employee.id,
        orderStatus: "preparing",
        orderType: "walk-in"
      },
      orderItemsBody: mappedOrderItems,
      transactionBody: {
        change: defferedTenderedAmount - totalAmount,
        totalAmount,
        totalTendered,
        paymentMethod,
      }
    };

    console.log(reqBody);

    const req = await fetch(`${apiUrl}/order`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    });

    if (!req.ok) {
      console.log("There was a problem submitting order");
      toast({ title: "Order failed", description: "Kindly call the developers for reports.", })
      return;
    }

    const result = await req.json();
    console.log("Order in client: ", result);

    // Toast for submitting order
    toast({
      title: "Order successful",
      description: "New order has been recorded.",
    });
    dispatch(clearOrderItems());
  }

  return (
    // className='absolute md:static top-0 l-0 w-screen h-screen bg-black'
    <Card className={`
      w-full h-screen z-50 p-4 top-0 left-0 rounded-none ${showOrderSection ? "grid" : "hidden"} fixed
      md:w-full md:h-auto md:min-h-full md:static md:grid md:rounded-md grid-rows-orderSection overflow-auto`}>

      {/* <header className='flex w-full'>
        <div className=""></div>
        <Button onClick={() => dispatch(toggleShowOrderSection(false))}>
          <EyeClosed />
        </Button>
      </header> */}

      {/* <header className="w-full py-4 bg-red-500">
        Hello
      </header> */}

      <CardContent className='p-0 flex flex-col gap-2'>
        {Object.keys(orderItems).length <= 0 ? (
          <div>No product selected.</div>
        ) : Object.keys(orderItems).map(productId => (
          <OrderItem orderItem={orderItems[productId]} key={productId} />
        ))}
      </CardContent>

      {/* <Separator /> */}

      <CardFooter className='p-0 pt-14 grid'>
        <Separator />

        <div className='py-4 grid gap-2 w-full'>
          {/* <div className="flex justify-between">
            <div className="font-medium text-lg">Vatable sales</div>
            <div className="font-medium text-lg">₱ 200</div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium text-lg">Vat amount</div>
            <div className="font-medium text-lg">₱ 200</div>
          </div> */}
          <div className="flex justify-between">
            <div className="font-medium text-lg">Total amount</div>
            <div className="font-medium text-lg">₱ {totalAmount}</div>
          </div>

          {/* Total tendered */}
          <div className="grid gap-1">
            <div className="font-medium text-lg">Total tendered</div>
            <Input type='number' min="0" max="100000" onChange={handleTotalTenderedChange} />
          </div>

          <div className="flex justify-between">
            <div className="font-medium text-lg">Change</div>
            <div className="font-medium text-lg">₱ {defferedTenderedAmount - totalAmount}</div>
          </div>
        </div>

        <Separator />

        <div className="w-full flex gap-2 justify-between py-4">
          <Select onValueChange={(e: typeof paymentMethod) => setPaymentMethod(e)} defaultValue={paymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem defaultChecked value="cash">Cash</SelectItem>
              <SelectItem value="gcash">Gcash</SelectItem>
            </SelectContent>
          </Select>

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
          <Button variant='outline' onClick={() => dispatch(clearOrderItems())}>Cancel</Button>
          <Button disabled={Object.keys(orderItems).length <= 0 || defferedTenderedAmount <= 0 || defferedTenderedAmount < totalAmount}
            onClick={handleCreateOrder}
          >Place order</Button>
        </div>
      </CardFooter>


    </Card>
  )
}

export default OrderSection
