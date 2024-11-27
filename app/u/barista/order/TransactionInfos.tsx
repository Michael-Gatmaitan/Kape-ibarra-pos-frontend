"use client";

import React from 'react'
import { ITransactionWithOrderAndOrderItems } from './page';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card';
import { ICategory, IOrderItem, IProduct } from '../../../..';
import Image from 'next/image';
import { AspectRatio } from '../../../../components/ui/aspect-ratio';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../../components/ui/alert-dialog';
import { useToast } from '../../../../@/hooks/use-toast';
import { apiUrl } from '../../../../lib/apiUrl';
import { getTokenClient } from '../../../../lib/tokenAPI';
import { useUserPayload } from '../../../../lib/customHooks';

const TransactionInfos = ({ transaction }: { transaction: ITransactionWithOrderAndOrderItems }) => {
  const { toast } = useToast();
  const payload = useUserPayload();

  if (!transaction?.id) {
    return <div>No transaction selected</div>
  }

  const { orderItems } = transaction.order;

  const handleMarkAsDone = async () => {
    const token = await getTokenClient();

    console.log(payload);

    const updateReq = await fetch(`${apiUrl}/order/${transaction.order.id}?updateType=mark_as_done`, {
      cache: 'no-cache',
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({
        baristaId: payload.person.id,
      })
    });

    if (!updateReq.ok) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Error updating order"
      })
    }

    const updateResult = await updateReq.json();
    console.log(updateResult);

    toast({
      title: `Order ${transaction.order.customerNumber}`,
      description: `Order ${transaction.order.customerNumber} marked as done!`
    });
  };

  return (
    <Card className='p-4 grid grid-rows-orderSection h-full md:h-auto md:min-h-full overflow-auto no-scrollbar'>
      <CardHeader className='py-4 text-center'>
        <CardTitle className='font-bold'>Order #{transaction.order.customerNumber}</CardTitle>
        {/* <CardDescription>{transaction.id}</CardDescription> */}
        <CardDescription>{transaction.order.baristaId ? transaction.order.baristaId : "No barista processed this order yet"}</CardDescription>
      </CardHeader>

      <CardContent className='p-0 flex flex-col gap-2'>
        {orderItems.map(orderItem => (
          <React.Fragment key={orderItem.id}>
            <ProductOrdered orderItem={orderItem} />
          </React.Fragment>
        ))}
      </CardContent>

      <CardFooter className='p-0 w-full pt-4'>
        <div className='w-full'>
          <ConfirmAlertDialog handlerFunc={handleMarkAsDone} />
        </div>
      </CardFooter>
    </Card>
  );
}

const ConfirmAlertDialog = ({ handlerFunc }: { handlerFunc: () => void }) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">Mark as done</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlerFunc}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const ProductOrdered = ({ orderItem }: {
  orderItem: IOrderItem & {
    product: IProduct & { category: ICategory };
  }
}) => {
  const { product } = orderItem;
  const { category } = product;
  const { productName, imagePath, id } = product;
  const { categoryName } = category;

  return (
    <div className='border p-2 rounded-md'>
      <div className='grid grid-cols-orderItem gap-2'>
        <AspectRatio>
          <Image src={imagePath} alt={id} fill className="h-full w-full rounded-md object-cover min-h-[100px] min-w-[100px]" />
        </AspectRatio>

        <div className="grid w-full gap-2">
          <div>
            <div className="font-bold text-2xl">{productName}</div>

            <div className='flex gap-1'>
              <Badge>{categoryName}</Badge>
              <Badge variant='outline'>
                {orderItem.quantity} pcs
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionInfos
