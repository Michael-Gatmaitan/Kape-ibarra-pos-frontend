import React from 'react'
import { apiUrl } from '../../../lib/apiUrl'
import { ICategory, IProduct } from '../../..';
// import Image from 'next/image';

import { DataTable } from '../data-table';
import { columns } from './columns';
import Head from 'next/head';
import ViewHeaders from '../view-headers';

const page = async () => {
  const productsReq = await fetch(`${apiUrl}/product?category=true`, { cache: 'no-cache' });

  if (!productsReq.ok) {
    return <div>Somthing went wrong getting all products</div>
  }

  const products: IProduct[] & { category: ICategory } = await productsReq.json();
  return (
    <div>
      <Head>
        <title>Product list</title>
      </Head>

      <header>
        <ViewHeaders
          headerTitle='Product list'
          buttonUrl='/create/product'
          buttonTitle='Create new product'
        />
      </header>

      <DataTable data={products} columns={columns} />
    </div>
  )
}

export default page
