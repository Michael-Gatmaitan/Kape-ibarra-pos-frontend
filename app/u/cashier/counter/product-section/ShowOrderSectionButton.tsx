"use client";
import React from 'react'
import { useAppDispatch } from '../../../../../lib/hooks';
import { toggleShowOrderSection } from '../../../../../lib/features/state/stateSlice';
import { Button } from '../../../../../components/ui/button';
import { ShoppingCart } from 'lucide-react';

const ShowOrderSectionButton = () => {
  const dispatch = useAppDispatch();

  return (
    <Button onClick={() => dispatch(toggleShowOrderSection(true))}
      className='fixed bottom-4 md:hidden'
    >
      <ShoppingCart />
      <span>View orders</span>
    </Button>
  )
}

export default ShowOrderSectionButton

