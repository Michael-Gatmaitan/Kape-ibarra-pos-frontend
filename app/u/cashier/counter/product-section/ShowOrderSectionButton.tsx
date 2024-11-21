"use client";
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../lib/hooks';
import { toggleShowOrderSection } from '../../../../../lib/features/state/stateSlice';
import { Button } from '../../../../../components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { selectOrderItemsBody } from '../../../../../lib/features/order/orderSlice';

const ShowOrderSectionButton = () => {
  const dispatch = useAppDispatch();
  const orderItems = useAppSelector(selectOrderItemsBody);

  return (
    <Button onClick={() => dispatch(toggleShowOrderSection(true))}
      className='fixed bottom-4 md:hidden items-center'
    >
      <ShoppingCart />
      <span>View orders</span>
      <span>{Object.keys(orderItems).length}</span>
    </Button>
  )
}

export default ShowOrderSectionButton

