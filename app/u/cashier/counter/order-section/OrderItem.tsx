"use client";
import React from 'react'
import { Button } from '../../../../../components/ui/button';
import { Minus, Plus, Trash } from 'lucide-react';
import { Badge } from '../../../../../components/ui/badge';
import { deleteOrderItem, handleOrderItemQuantity, OrderItems } from '../../../../../lib/features/order/orderSlice';
import { AspectRatio } from '../../../../../components/ui/aspect-ratio';
import Image from 'next/image';
import { useAppDispatch } from '../../../../../lib/hooks';

const OrderItem = (props: { orderItem: OrderItems }) => {
  const { orderItem } = props;
  const { productId, productName, quantity, quantityAmount, categoryName, imagePath } = orderItem;

  const dispatch = useAppDispatch();

  return (
    <div className='border rounded-md p-2 grid w-full h-min gap-2'>
      <div className='grid grid-cols-orderItem gap-2'>
        <AspectRatio >
          <Image src={imagePath} alt={productId} fill className="h-full w-full rounded-md object-cover min-h-[100px] min-w-[100px]" />
        </AspectRatio>

        <div className="grid w-full gap-2">
          {/* Title and button */}
          <div className="flex justify-between">
            <div>
              <div className="font-bold text-2xl">
                {/* Sample product */}
                {productName}
              </div>
              <Badge>
                {/* Badge */}
                {categoryName}
              </Badge>
            </div>
          </div>

          {/* Price and quantity */}
          <div className="w-full flex justify-between items-end">
            <div className="text-lg">
              {/* {20} */}
              ₱ {quantityAmount}
            </div>

            <div className="flex gap-2 items-center">
              <Button variant='outline' className='w-9 h-9' onClick={() => dispatch(handleOrderItemQuantity({ productId, type: 'inc' }))}>
                <Plus />
              </Button>
              <span>
                {/* {20} */}
                {quantity}
              </span>
              <Button variant='outline' className='w-9 h-9' disabled={quantity <= 1} onClick={() => dispatch(handleOrderItemQuantity({ productId, type: 'dec' }))}>
                <Minus />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button variant='destructive' onClick={() => dispatch(deleteOrderItem({ productId }))}>
        <Trash />
        <span>Delete</span>
      </Button>
    </div>
  )
}

export default OrderItem
