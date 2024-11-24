"use client";
import React, { useState } from 'react'
// import { apiUrl } from '../../../../lib/apiUrl';
// import { IOrder } from '../../../..';
import { useGetOrders } from '../../../../lib/customHooks';

const OrderStack = () => {
  const [orderStatus, setOrderStatus] = useState("preparing");
  const orders = useGetOrders({ orderStatus });

  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>
          {order.orderStatus}
        </div>
      ))}
    </div>
  )
}

export default OrderStack
