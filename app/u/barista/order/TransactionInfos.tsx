"use client";

import React from 'react'
import { ITransactionWithOrderAndOrderItems } from './page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { IOrderItem, IProduct } from '../../../..';

const TransactionInfos = ({ transaction }: { transaction: ITransactionWithOrderAndOrderItems }) => {

  if (!transaction?.id) {
    return <div>No transaction selected</div>
  }

  const { orderItems } = transaction.order;

  return (
    <Card className='p-2'>
      <CardHeader className='py-4 text-center'>
        <CardTitle className='font-bold'>Order #{transaction.order.customerNumber}</CardTitle>
        <CardDescription>{transaction.id}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="products">
          {orderItems.map(orderItem => (
            <div key={orderItem.id}>
              <ProductOrdered orderItem={orderItem} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const ProductOrdered = ({ orderItem }: {
  orderItem: IOrderItem & {
    product: IProduct;
  }
}) => {
  return (
    <div>
      {orderItem.product.id}
    </div>
  )
}

export default TransactionInfos
