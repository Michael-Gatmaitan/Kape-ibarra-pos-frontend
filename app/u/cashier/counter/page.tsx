import React from 'react'
import ProductSection from './product-section'
import OrderSection from './order-section'
import { apiUrl } from '../../../../lib/apiUrl'
import { ICategory } from '../../../..'
import ShowOrderSectionButton from './product-section/ShowOrderSectionButton'

export interface IOrderRequirements {
  orderBody: {
    userId: string
  },
  orderItemsBody: {
    productId: string,
    quantity: number,
    quantityAmount: number
  }[],
}

export interface IOrderProcessResult {
  id: string,
  orderedAt: string,
  userId: string,
  customerId: string | null,
  customerNumber: string,
  totalPrice: number,
  orderStatus: boolean
}

const page = async () => {
  const categoriesReq = await fetch(`${apiUrl}/category`, { cache: 'no-cache' });

  if (!categoriesReq.ok) return <div>Categores in counter not ok</div>

  const categories: ICategory[] = await categoriesReq.json();

  return (
    // <div className="md:grid-cols-order md:gap-4">
    <div className='block md:grid min-h-svh grid-cols-2 gap-4'>
      <ProductSection categories={categories} />
      <OrderSection />

      <ShowOrderSectionButton />
    </div >
  )
}

export default page
