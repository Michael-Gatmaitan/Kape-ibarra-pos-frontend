import React from 'react'
import ProductSection from '../../../u/cashier/counter/product-section'
import { ICategory, IEWallet } from '../../../..';
import { apiUrl } from '../../../../lib/apiUrl';
import OrderSection from '../../../u/cashier/counter/order-section';
import ShowOrderSectionButton from '../../../u/cashier/counter/product-section/ShowOrderSectionButton';
import { getUserPayloadServer } from '../../../../actions/serverActions';
import { getCookieToken } from '../../../../lib/cookieToken';

const page = async () => {
  const payload = await getUserPayloadServer();
  const token = await getCookieToken()
  const categoriesReq = await fetch(`${apiUrl}/category`, {
    cache: 'no-cache',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  if (!categoriesReq.ok) return <div>Categores in customer not ok</div>

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

  const ewalletRes: IEWallet = await ewalletReq.json();

  if (!ewalletRes?.phoneNumber && payload.roleName === 'customer') {
    <div>You cannot order yet because gcash information of shop is not available</div>
  }

  return (
    <div className='block md:grid h-[calc(100vh-16px)] grid-cols-order gap-4'>
      <ProductSection categories={categories} />
      <OrderSection payload={payload} token={token} ewallet={ewalletRes} />

      <ShowOrderSectionButton />
    </div>
  )
}

export default page
