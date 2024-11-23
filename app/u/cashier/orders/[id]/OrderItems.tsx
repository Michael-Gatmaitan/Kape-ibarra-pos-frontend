import React from 'react'
import { IOrderItem, IProduct } from '../../../../..'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card';

type IOrderItemProps = (IOrderItem & { product: IProduct })[];

const OrderItems = (props: { orderItems: IOrderItemProps }) => {
  const { orderItems } = props;

  return (
    <Card className='p-4'>
      <CardHeader className='p-0'>
        <CardTitle>Order item/s</CardTitle>
      </CardHeader>
      <CardContent className='pt-2 pb-0 px-0'>
        {orderItems.map((orderItem) => (
          <div key={orderItem.id}>{
            orderItem.product.productName
          }</div>
        ))}
      </CardContent>
    </Card>
  )
}

export default OrderItems
