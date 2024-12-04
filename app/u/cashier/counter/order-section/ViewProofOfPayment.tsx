"use client";

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
} from '../../../../../components/ui/alert-dialog';
import Image from 'next/image';
import { Button } from '../../../../../components/ui/button';
import { apiUrl } from '../../../../../lib/apiUrl';
import { getTokenClient } from '../../../../../lib/tokenAPI';
import { getUserPayloadServer } from '../../../../../actions/serverActions';
import { useToast } from '../../../../../@/hooks/use-toast';
import { updateOrderToPreparing } from '../../../../../lib/action';

const ViewProofOfPayment = ({ imageUrl, type, orderId, customerNumber }: { imageUrl: string; type: "preview" | "process-order", orderId?: string, customerNumber?: number }) => {
  const { toast } = useToast();

  const handleUpdateOrderToPreparing = updateOrderToPreparing.bind(null, {
    type,
    orderId,
    customerNumber
  });

  const onSubmit = async () => {
    const handleUpdateOrderToPreparing = updateOrderToPreparing.bind(null, {
      type,
      orderId,
      customerNumber
    });
    const result = await handleUpdateOrderToPreparing();

    console.log(result)

    if (result?.id) {
      toast({ title: `Order#${customerNumber} status changed to "preparing"` });
    }
  }

  // const handlePaymentAccept = async () => {

  //   if (type !== 'process-order') return;

  //   const token = await getTokenClient();
  //   const payload = await getUserPayloadServer();

  //   const acceptedOrderReq = await fetch(`${apiUrl}/order/${orderId}?updateType=payment_confirmation`, {
  //     method: "PUT",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: token
  //     },
  //     body: JSON.stringify({
  //       employeeId: payload.person.id
  //     })
  //   });

  //   if (!acceptedOrderReq.ok) {
  //     console.log("Error in accepting order payment");
  //     return;
  //   }

  //   const acceptedOrderRes = await acceptedOrderReq.json();

  //   console.log(acceptedOrderRes);
  //   toast({ title: `Order#${customerNumber} status changed to "preparing"` });
  // }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show image uploaded</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Proof of payment</AlertDialogTitle>
          {/* <AspectRatio className='rounded-md w-full h-full'> */}
          {/* <div className='max-h-20'> */}
          <div className="w-max-full h-max-full w-auto h-[calc(100%-56px)] relative">
            <Image src={imageUrl} width={200} height={100} className="rounded-md h-full w-auto m-auto" alt={imageUrl} />
          </div>
          {/* <Image src={imageUrl} fill className="rounded-md max-h-full max-w-full" alt={imageUrl} /> */}
          {/* </div> */}
          {/* </AspectRatio> */}
          {type === 'preview' ? (
            <AlertDialogDescription>
              You can replace the image by re-uploading a new screenshot
            </AlertDialogDescription>
          ) : type === "process-order" ? (
            <AlertDialogDescription>
              Uploaded by user
            </AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {type === 'preview' ? (
            <AlertDialogAction>Continue</AlertDialogAction>
          ) : type === 'process-order' ? (
            <>
              <AlertDialogCancel>Decline</AlertDialogCancel>
              <AlertDialogAction onClick={onSubmit}>Accept</AlertDialogAction>
            </>
          ) : null}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ViewProofOfPayment;