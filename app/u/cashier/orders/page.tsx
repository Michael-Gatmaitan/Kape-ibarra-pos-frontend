import React from 'react'
import { getCookieToken } from '../../../../lib/cookieToken'
import { apiUrl } from '../../../../lib/apiUrl';
import { ICustomer, IOrder, IOrderItem, IProduct } from '../../../..';
import PendingOrderCard from './PendingOrderCard';

export type IOrderWithCustomerAndOI =
  IOrder & {
    customer: ICustomer
  } & {
    orderItems: (IOrderItem & {
      product: IProduct
    })[]
  }

const page = async () => {
  const token = await getCookieToken();
  const paymentPendingOrdersReq = await fetch(`${apiUrl}/order?orderStatus=payment pending`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  if (!paymentPendingOrdersReq.ok) {
    return <div>Getting payment pending order problem</div>
  }

  const orders: IOrderWithCustomerAndOI[] = await paymentPendingOrdersReq.json();

  return (
    <div>
      <div className="text-2xl pb-2 font-bold">List of orders</div>

      <div className="grid grid-cols-2 gap-2">
        {orders.length === 0 ? (
          <div>There's no order requests yet.</div>
        ) : orders.map(order => (
          <PendingOrderCard order={order} key={order.id} />
        ))}
      </div>
    </div >
  )
}

export default page
