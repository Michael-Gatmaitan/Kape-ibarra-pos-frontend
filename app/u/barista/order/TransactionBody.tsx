"use client";
import React, { useState } from 'react'
import TransactionStack from './TransactionStack';
import { ITransactionWithOrderAndOrderItems } from './page';
import TransactionInfos from './TransactionInfos';

interface ITransactionBodyProps {
  transactions: ITransactionWithOrderAndOrderItems[]
}

const TransactionBody = (props: ITransactionBodyProps) => {
  const { transactions } = props;
  const [activeTransaction, setActiveTransaction] = useState<ITransactionWithOrderAndOrderItems>();

  return (
    <div className='w-full h-full grid gap-2 grid-cols-1 md:grid-cols-order'>
      <TransactionStack transactions={transactions} setActiveTransaction={setActiveTransaction} />
      <TransactionInfos transaction={activeTransaction} />
    </div>
  )
}

export default TransactionBody
