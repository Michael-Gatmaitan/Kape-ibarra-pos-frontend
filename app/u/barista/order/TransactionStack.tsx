"use client";
import React, { Dispatch, SetStateAction } from 'react'
// import { apiUrl } from '../../../../lib/apiUrl';
// import { IOrder } from '../../../..';
// import { useGetOrders } from '../../../../lib/customHooks';
import { ITransactionWithOrderAndOrderItems } from './page';
import TransactionItem from './TransactionItem';

interface ITransactionStackProps {
  transactions: ITransactionWithOrderAndOrderItems[];
  setActiveTransaction: Dispatch<SetStateAction<ITransactionWithOrderAndOrderItems>>;
}

const TransactionStack = (props: ITransactionStackProps) => {
  const { transactions, setActiveTransaction } = props;

  return (
    <div className='grid gap-2 grid-cols-autoFitTransaction'>
      {transactions.map(transaction => (
        <TransactionItem key={transaction.id} transaction={transaction} setActiveTransaction={setActiveTransaction} />
      ))}
    </div>
  )
}

export default TransactionStack
