"use client";
import React, { useEffect, useState } from 'react'
import TransactionStack from './TransactionStack';
import { ITransactionWithOrderAndOrderItems } from './page';
import TransactionInfos from './TransactionInfos';
import { apiUrl } from '../../../../lib/apiUrl';
import { getTokenClient } from '../../../../lib/tokenAPI';

// interface ITransactionBodyProps {
//   transactions: ITransactionWithOrderAndOrderItems[]
// }

const TransactionBody = () => {
  // const { transactions } = props;
  const [activeTransaction, setActiveTransaction] = useState<ITransactionWithOrderAndOrderItems>();
  const [transactions, setTransactions] = useState<ITransactionWithOrderAndOrderItems[]>([]);
  const [orderStatusFilter, setOrderStatusFilter] = useState<"preparing" | "ready">('preparing');

  useEffect(() => {
    const getTransactions = async () => {
      const token = await getTokenClient();
      const req = await fetch(`${apiUrl}/transaction?order=true&orderStatus=${orderStatusFilter}`, {
        cache: "no-cache",
        headers: {
          'Content-Tpye': 'application/json',
          authorization: token
        }
      });

      if (!req.ok) {
        return <div>There was a problem getting transaction</div>
      }

      const result: ITransactionWithOrderAndOrderItems[] = await req.json();
      setTransactions(result);
    }

    getTransactions();
  }, [orderStatusFilter]);

  return (
    // <div className='w-full h-full grid gap-2 grid-cols-1 md:grid-cols-order'>
    <div className='block md:grid h-[calc(100vh-16px)] grid-cols-order gap-4'>

      <TransactionStack transactions={transactions} setActiveTransaction={setActiveTransaction} setOrderStatusFilter={setOrderStatusFilter} />
      <TransactionInfos transaction={activeTransaction} />
    </div>
  )
}

export default TransactionBody
