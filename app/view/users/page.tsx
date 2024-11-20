// & { role: IRole }

import React from 'react'
import { apiUrl } from '../../../lib/apiUrl'
import { IRole, IUser } from '../../..';
// import Image from 'next/image';

import { DataTable } from '../data-table';
import { columns } from './columns';
import Head from 'next/head';
import ViewHeaders from '../view-headers';

export type IUserWithRole = IUser[] & { role: IRole };

const page = async () => {
  const userReq = await fetch(`${apiUrl}/user?fullInfo=true`, { cache: 'no-cache' });

  if (!userReq.ok) {
    return <div>Somthing went wrong getting all categories</div>
  }

  const users: IUserWithRole[] = await userReq.json();

  return (
    <div>
      <Head>
        <title>Raw material list</title>
      </Head>

      <header>
        <ViewHeaders
          headerTitle='User / employee list'
        />
      </header>


      <DataTable data={users} columns={columns} />
    </div>
  )
}

export default page
