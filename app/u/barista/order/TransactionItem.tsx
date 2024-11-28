import React, { Dispatch, SetStateAction } from 'react'
import { ITransactionWithOrderAndOrderItems } from './page'
// import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Card } from '../../../../components/ui/card';
import { Label } from '../../../../components/ui/label';

interface ITransactionItemProps {
  transaction: ITransactionWithOrderAndOrderItems;
  setActiveTransaction: Dispatch<SetStateAction<ITransactionWithOrderAndOrderItems>>;
}

const TransactionItem = (props: ITransactionItemProps) => {
  const { transaction, setActiveTransaction } = props;

  const date = new Date(transaction.transactionDate);

  return (
    <Card className='grid gap-2 p-2' onClick={() => setActiveTransaction(transaction)}>
      <div className="flex justify-between w-full">

        <div className='font-bold text-lg'>Order #{transaction.order.customerNumber}</div>
        <Badge>{transaction.order.orderStatus}</Badge>
      </div>
      <Label>
        {date.toUTCString()}
      </Label>
    </Card>
  )
}

export default TransactionItem
