"use client";
import { EyeClosed } from 'lucide-react';
import React from 'react'
import { Button } from '../../../../components/ui/button';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { selectShowOrderSection, toggleShowOrderSection } from '../../../../lib/features/state/stateSlice';
import { Card, CardContent } from '../../../../components/ui/card';
import OrderItem from './order-section/OrderItem';
import { selectOrderItemsBody } from '../../../../lib/features/order/orderSlice';

const OrderSection = () => {
  const showOrderSection = useAppSelector(selectShowOrderSection);
  const orderItems = useAppSelector(selectOrderItemsBody);
  const dispatch = useAppDispatch();

  return (
    // className='absolute md:static top-0 l-0 w-screen h-screen bg-black'
    <Card className={`w-screen h-screen md:w-full md:h-auto md:static absolute z-50 p-4 top-0 left-0 rounded-none ${showOrderSection ? "block" : "hidden"}`}>

      <header className='flex w-full'>
        <div className=""></div>
        <Button onClick={() => dispatch(toggleShowOrderSection(false))}>
          <EyeClosed />
        </Button>
      </header>

      <CardContent className='p-0 grid gap-2  '>
        {Object.keys(orderItems).map(productId => (
          <OrderItem orderItem={orderItems[productId]} />
        ))}
      </CardContent>

    </Card>
  )
}

export default OrderSection
