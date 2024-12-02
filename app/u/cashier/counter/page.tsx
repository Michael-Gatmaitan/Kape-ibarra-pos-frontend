import React from 'react'
import ProductSection from './product-section'
import OrderSection from './order-section'
import { apiUrl } from '../../../../lib/apiUrl'
import { ICategory } from '../../../..'
import ShowOrderSectionButton from './product-section/ShowOrderSectionButton'
import { getUserPayloadServer } from '../../../../actions/serverActions'
import { getCookieToken } from '../../../../lib/cookieToken'

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
  const payload = await getUserPayloadServer();
  const token = await getCookieToken();
  const categoriesReq = await fetch(`${apiUrl}/category`, {
    cache: 'no-cache',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  if (!categoriesReq.ok) return <div>Categores in counter not ok</div>

  const categories: ICategory[] = await categoriesReq.json();

  const ewalletReq = await fetch(`${apiUrl}/e-wallet`, {
    cache: 'no-cache',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  if (!ewalletReq.ok) return <div>Error in getting e-wallet information</div>

  const ewalletRes = await ewalletReq.json();

  return (
    // <div className="md:grid-cols-order md:gap-4">
    <div className='block md:grid h-[calc(100vh-16px)] grid-cols-order gap-4'>
      <ProductSection categories={categories} />
      <OrderSection payload={payload} token={token} ewallet={ewalletRes} />

      <ShowOrderSectionButton />
    </div >
  )
}

export default page
