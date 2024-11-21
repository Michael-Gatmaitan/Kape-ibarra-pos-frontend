"use client";
import { EyeClosed } from 'lucide-react';
import React, { FormEvent, useDeferredValue, useEffect, useState } from 'react'
import { Button } from '../../../../components/ui/button';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { selectShowOrderSection, toggleShowOrderSection } from '../../../../lib/features/state/stateSlice';
import { Card, CardContent, CardFooter } from '../../../../components/ui/card';
import OrderItem from './order-section/OrderItem';
import { clearOrderItems, selectOrderItemsBody, selectTotalAmount, selectTotalTendered, setTotalTendered } from '../../../../lib/features/order/orderSlice';
import { Separator } from '../../../../components/ui/separator';
import { Input } from '../../../../components/ui/input';
import { apiUrl } from '../../../../lib/apiUrl';
import { getUserPayloadServer } from '../../../../actions/serverActions';
import { useUserPayload } from '../../../../lib/customHooks';

const OrderSection = () => {
  const showOrderSection = useAppSelector(selectShowOrderSection);
  const orderItems = useAppSelector(selectOrderItemsBody);
  const dispatch = useAppDispatch();

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
        employeeId: payload.employee.id
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

    const result = await req.json();
    console.log("Order in client: ", result);
  }

  return (
    // className='absolute md:static top-0 l-0 w-screen h-screen bg-black'
    <Card className={`w-full h-screen md:w-full md:h-auto md:static fixed z-50 p-4 top-0 left-0 rounded-none ${showOrderSection ? "grid" : "hidden"} grid-rows-orderSection overflow-auto`}>

      {/* <header className='flex w-full'>
        <div className=""></div>
        <Button onClick={() => dispatch(toggleShowOrderSection(false))}>
          <EyeClosed />
        </Button>
      </header> */}

      <CardContent className='p-0 grid gap-2'>
        {Object.keys(orderItems).map(productId => (
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

        <div className="grid gap-2 py-4">
          <div className="text-lg">Payment method</div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant={paymentMethod === "cash" ? 'default' : 'outline'} onClick={() => setPaymentMethod('cash')}>Cash</Button>
            <Button variant={paymentMethod === "gcash" ? 'default' : 'outline'} onClick={() => setPaymentMethod('gcash')}>GCash</Button>
          </div>
        </div>

        <Separator />

        <div className="grid gap-2 py-4">
          <div className="text-lg">Dining options</div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant={diningOption === "dine-in" ? 'default' : 'outline'} onClick={() => setDiningOption('dine-in')}>Dine-in</Button>
            <Button variant={diningOption === "take-out" ? 'default' : 'outline'} onClick={() => setDiningOption('take-out')}>Take-out</Button>
          </div>
        </div>

      </CardFooter>

      <div className="grid grid-cols-2 gap-2">
        <Button variant='outline' onClick={() => dispatch(clearOrderItems())}>Cancel</Button>
        <Button disabled={defferedTenderedAmount <= 0 || defferedTenderedAmount < totalAmount}
          onClick={handleCreateOrder}
        >Place order</Button>
      </div>

    </Card>
  )
}

export default OrderSection
