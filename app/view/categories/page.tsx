import React from 'react'
import { apiUrl } from '../../../lib/apiUrl'
import { ICategory, IProduct } from '../../..';
// import Image from 'next/image';

import { DataTable } from '../data-table';
import { columns } from './columns';
import Head from 'next/head';
import ViewHeaders from '../view-headers';

export type ICategoryWithProducts = ICategory[] & { products: IProduct[] }

const page = async () => {
  const categoryReq = await fetch(`${apiUrl}/category`, { cache: 'no-cache' });

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
