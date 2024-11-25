import React from 'react'
import { apiUrl } from '../../../../lib/apiUrl'
import { IOrder, IOrderItem, IProduct, ITransaction } from '../../../..'
import TransactionBody from './TransactionBody';

// export type ITransactionWithOrderAndOrderItems = ITransaction & {
//   order: IOrder & { orderItems: IOrderItem & { products: IProduct[] }[] }
// };

export type ITransactionWithOrderAndOrderItems = ITransaction & {
  order: IOrder & { orderItems: (IOrderItem & { product: IProduct })[]; }
};

const page = async () => {

  const req = await fetch(`${apiUrl}/transaction?order=true`, { cache: "no-cache" });

  if (!req.ok) {
    return <div>There was a problem getting transaction</div>
  }

  const result: ITransactionWithOrderAndOrderItems[] = await req.json();

  console.log(result);
  return (
    <div className='w-full h-[calc(100%)]'>

      <TransactionBody transactions={result} />
    </div>
  )
}

export default page
