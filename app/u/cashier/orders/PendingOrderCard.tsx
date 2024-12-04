"use client";
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { IOrderWithCustomerAndOI } from './page';
import { Badge } from '../../../../components/ui/badge';
// import OrderItem from '../counter/order-section/OrderItem';
import { Button } from '../../../../components/ui/button';
import { Expand, Minimize2 } from 'lucide-react';
// import { IOrderItem, IProduct } from '../../../..';
import ViewProofOfPayment from '../counter/order-section/ViewProofOfPayment';

const PendingOrderCard = ({ order }: { order: IOrderWithCustomerAndOI }) => {
  const { customerNumber, customer } = order;
  const { firstname, lastname } = customer;

  const [expanded, setExpanded] = useState(false);

  return (
    <Card className='p-0'>
      <CardHeader className='p-4'>
        <div className="flex justify-between">
          <CardTitle>Order #{customerNumber}</CardTitle>
          <div className="expand">
            <Button onClick={() => setExpanded(prev => !prev)} variant="outline" size="icon">
              {expanded ? <Minimize2 /> : <Expand />}
            </Button>
          </div>
        </div>
        <CardDescription>{firstname} {lastname}</CardDescription>
      </CardHeader>

      <CardContent className={`p-4`}>
        <Badge>{order.orderStatus}</Badge>
        {
          !expanded ?
            <div className='opacity-50 text-sm'>{order.orderItems.length} items</div>
            : <ExpandedView order={order} />
        }

        {expanded}
      </CardContent>
    </Card>
  )
}

const ExpandedView = ({ order }: { order: IOrderWithCustomerAndOI }) => {
  const { orderItems } = order;

  return (
    <div className='grid gap-2 pt-1'>
      <div className="grid p-1 bg-fuchsia-800">
        {orderItems.map(orderItem => (
          <div key={orderItem.id}>
            <div>{orderItem.product.productName}</div>
          </div>
        ))}
      </div>
      <ViewProofOfPayment imageUrl={order.proofOfPaymentImg} type='process-order' orderId={order.id} customerNumber={order.customerNumber} />
    </div>
  )
}

export default PendingOrderCard
