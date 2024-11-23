import React from 'react'
import { apiUrl } from '../../../../../lib/apiUrl'
import { IEmployee, IOrder, IOrderItem, IProduct } from '../../../../..'
import { isErrorMessage } from '../../../../../lib/types';
import { Badge } from '../../../../../components/ui/badge';
import OrderItems from './OrderItems';

type IOrderResponse =
  (IOrder & { orderItems: (IOrderItem & { product: IProduct })[] }
    & { employee: IEmployee });

const page = async ({ params }: { params: { id: string } }) => {
  const orderReq = await fetch(`${apiUrl}/order/${params.id}?orderItems=true&employee=true`)

  if (!orderReq.ok) {
    return <div>Something went wrong getting order</div>
  }

  const orderRes: IOrderResponse = await orderReq.json();

  if (isErrorMessage(orderRes)) {
    return <div>{orderRes.message}</div>
  }

  return (
    <div>
      <div className="text-xl">Order {orderRes.id}</div>
      <Badge>{orderRes.orderStatus ? "Ready to pickup" : "Preparing"}</Badge>

      <OrderItems orderItems={orderRes.orderItems} />
    </div>
  )
}

export default page
