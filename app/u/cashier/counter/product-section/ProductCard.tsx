"use client";

import { ICategory, IProduct } from "../../../../..";
import { Card, CardContent, CardFooter, CardHeader } from '../../../../../components/ui/card';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';
import { Badge } from '../../../../../components/ui/badge';
import { useAppDispatch } from "../../../../../lib/hooks";
import { handleOrderItem, OrderItems } from "../../../../../lib/features/order/orderSlice";
import { useEffect, useState } from "react";

interface IProductCardProps { product: IProduct & { category: ICategory }, orderItems: { [key: string]: OrderItems } }

const ProductCard = (props: IProductCardProps) => {
  const dispatch = useAppDispatch();
  const { product, orderItems } = props;
  const { id, productName, imagePath, category, price } = product;
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


  return (
    <Card onClick={handleProductSelect} className={`${selected ? "bg-secondary hover:bg-secondary" : 'hover:bg-popover'}`}>
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

// "Error in creating transaction: PrismaClientKnownRequestError:
// Invalid `prisma.order.create()` invocation in
// C:\Users\Michael\Desktop\Projects\ibarra_pos\backend\controllers\orders\orderController.ts:63:43

//   60 const { totalAmount, totalTendered, change, paymentMethod } =
//   61   req.body.transactionBody;
//   62
// → 63 const newOrder = await prisma.order.create(
// Foreign key constraint violated: `fk_order_employee (index)`"