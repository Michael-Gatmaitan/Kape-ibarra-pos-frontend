import React, { Dispatch, SetStateAction } from 'react'
import { ITransactionWithOrderAndOrderItems } from './page'
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';

interface ITransactionItemProps {
  transaction: ITransactionWithOrderAndOrderItems;
  setActiveTransaction: Dispatch<SetStateAction<ITransactionWithOrderAndOrderItems>>;
}

const TransactionItem = (props: ITransactionItemProps) => {
  const { transaction, setActiveTransaction } = props;

  return (
    <Button variant='outline' className='p-4 flex justify-between' onClick={() => setActiveTransaction(transaction)}>
      <div>Order #{transaction.order.customerNumber}</div>
      <Badge>{transaction.order.orderStatus}</Badge>
    </Button>
  )
}

export default TransactionItem
