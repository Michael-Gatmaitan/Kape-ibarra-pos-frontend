"use client";

import { ICategory, IProduct } from "../../../../..";
import { Card, CardContent, CardFooter, CardHeader } from '../../../../../components/ui/card';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';
import { Badge } from '../../../../../components/ui/badge';
import { useAppDispatch } from "../../../../../lib/hooks";
import { handleOrderItem, OrderItems } from "../../../../../lib/features/order/orderSlice";
import { useEffect, useState } from "react";
import { useToast } from "../../../../../@/hooks/use-toast";

interface IProductCardProps { product: IProduct & { category: ICategory }, orderItems: { [key: string]: OrderItems } }

const ProductCard = (props: IProductCardProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { product, orderItems } = props;
  const { id, productName, imagePath, category, price, isAvailable } = product;
  const { categoryName } = category;
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    if (orderItems[id]?.productId) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [orderItems, id]);

  const handleProductSelect = () => {
    // check if order is already in cart
    dispatch(handleOrderItem({ productId: id, categoryName, imagePath, productName, price }));
    setSelected(!selected);
  }

  const toastProductNotAvailable = () => {
    toast({ variant: "destructive", title: `${productName} is not available` });
  }


  return (
    <Card
      onClick={!isAvailable ? toastProductNotAvailable : handleProductSelect}
      className={
        `
          ${selected ? "bg-secondary hover:bg-secondary" : 'hover:bg-popover'}
          ${!isAvailable ? "opacity-45 cursor-default" : "cursor-pointer"}
        `
      }
    >
      <CardHeader className='p-2'>
        <AspectRatio ratio={1 / 1} className='rounded-md'>
          <Image src={imagePath} alt={id} fill className="h-full w-full rounded-md object-cover" />
        </AspectRatio>
      </CardHeader>

      <CardContent className='px-2'>
        <div className="font-semibold text-md pt-1">{productName}</div>

        <div className="flex justify-between pt-2">

          <Badge>{categoryName}</Badge>
          <div className="text-sm font-medium">₱ {price}</div>
        </div>
      </CardContent>
      <CardFooter className="p-0"></CardFooter>
    </Card>
  )
}

export default ProductCard;