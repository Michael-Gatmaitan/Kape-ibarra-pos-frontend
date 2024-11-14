import React from 'react'
import { apiUrl } from '../../../lib/apiUrl'
import { ICategory, IProduct } from '../../..';
// import Image from 'next/image';

import { DataTable } from './data-table';
import { columns } from './columns';

const page = async () => {
  const productsReq = await fetch(`${apiUrl}/product?category=true`);

  if (!productsReq.ok) {
    return <div>Somthing went wrong getting all products</div>
  }

  const products: IProduct[] & { category: ICategory } = await productsReq.json();

  return (
    <div className='w-full'>
      <DataTable data={products} columns={columns} />
      {/* {products.map(product => (
        <div key={product.id}>
          {product.productName}
          {product.imagePath}
          {product.imagePath && <Image src={product.imagePath} alt="asd" width={900} height={900} className='h-auto w-full' />}
        </div>
      ))} */}
    </div>
  )
}

export default page
