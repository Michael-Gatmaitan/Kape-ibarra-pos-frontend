"use client";
import React, { Dispatch, SetStateAction } from 'react'
import { ITransactionWithOrderAndOrderItems } from './page';
import TransactionItem from './TransactionItem';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';

interface ITransactionStackProps {
  transactions: ITransactionWithOrderAndOrderItems[];
  setActiveTransaction: Dispatch<SetStateAction<ITransactionWithOrderAndOrderItems>>;
  setOrderStatusFilter: Dispatch<SetStateAction<"preparing" | "ready">>;
}

const TransactionStack = (props: ITransactionStackProps) => {
  const { transactions, setActiveTransaction, setOrderStatusFilter } = props;

  return (
    <div>
      <div className='flex w-full justify-between'>
        <div className='text-2xl font-bold pb-2'>
          Manage orders
        </div>

        {/* Dropdown */}
        {/* setOrderStatusFilter */}
        <Select onValueChange={(e: "preparing" | "ready") => {
          setOrderStatusFilter(e);
        }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Preparing" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
          </SelectContent>
        </Select>

      </div>
      {/* grid-cols-autoFitTransaction */}
      <div className='grid gap-2 h-min max-h-full'>
        {transactions.length <= 0 ? "No orders pending." : transactions.map(transaction => (
          <TransactionItem key={transaction.id} transaction={transaction} setActiveTransaction={setActiveTransaction} />
        ))}
      </div>
    </div >
  )
}

export default TransactionStack
