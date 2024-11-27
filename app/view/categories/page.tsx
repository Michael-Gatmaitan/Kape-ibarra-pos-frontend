import React from 'react'
import { apiUrl } from '../../../lib/apiUrl'
import { ICategory, IProduct } from '../../..';
// import Image from 'next/image';

import { DataTable } from '../data-table';
import { columns } from './columns';
import Head from 'next/head';
import ViewHeaders from '../view-headers';
import { cookies } from 'next/headers';

export type ICategoryWithProducts = ICategory[] & { products: IProduct[] }

const page = async () => {
  const token = cookies().get('token')?.value;
  const categoryReq = await fetch(`${apiUrl}/category`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  if (!categoryReq.ok) {
    return <div>Somthing went wrong getting all categories</div>
  }

  const categories: ICategoryWithProducts[] = await categoryReq.json();

  return (
    <div>
      <Head>
        <title>Category list</title>
      </Head>

      <header>
        <ViewHeaders
          headerTitle='Category list'
          buttonUrl='/create/category'
          buttonTitle='Create new category'
        />
      </header>

      <DataTable data={categories} columns={columns} />
    </div>
  )
}

export default page
