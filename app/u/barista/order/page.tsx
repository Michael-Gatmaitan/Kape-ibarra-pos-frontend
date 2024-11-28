import React from 'react'
// import { apiUrl } from '../../../../lib/apiUrl'
import { ICategory, IOrder, IOrderItem, IProduct, ITransaction } from '../../../..'
import TransactionBody from './TransactionBody';
// import { cookies } from 'next/headers';

// export type ITransactionWithOrderAndOrderItems = ITransaction & {
//   order: IOrder & { orderItems: IOrderItem & { products: IProduct[] }[] }
// };

export type ITransactionWithOrderAndOrderItems = ITransaction & {
  order: IOrder & { orderItems: (IOrderItem & { product: IProduct & { category: ICategory } })[]; }
};

const page = async () => {

  return (
    <div className='w-full h-[calc(100%)]'>

      <TransactionBody />
    </div>
  )
}

export default page
