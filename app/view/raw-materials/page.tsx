import React from 'react'
import { apiUrl } from '../../../lib/apiUrl'
import { IRawMaterial } from '../../..';
// import Image from 'next/image';

import { DataTable } from '../data-table';
import { columns } from './columns';
import Head from 'next/head';
import ViewHeaders from '../view-headers';
import { cookies } from 'next/headers';

const page = async () => {
  const token = cookies().get('token')?.value;
  console.log(token);
  const rawMaterialReq = await fetch(`${apiUrl}/raw-material`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  if (!rawMaterialReq.ok) {
    return <div>Somthing went wrong getting all categories</div>
  }

  const rawMaterials: IRawMaterial[] = await rawMaterialReq.json();

  return (
    <div>
      <Head>
        <title>Raw material list</title>
      </Head>

      <header>
        <ViewHeaders
          headerTitle='Raw material list'
          buttonUrl='/create/raw-material'
          buttonTitle='Create new raw material'
        />
      </header>


      <DataTable data={rawMaterials} columns={columns} />
    </div>
  )
}

export default page
