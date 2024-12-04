// & { role: IRole }

import React from 'react'
import { apiUrl } from '../../../lib/apiUrl'
import { IRole, IEmployee } from '../../..';
// import Image from 'next/image';

import { DataTable } from '../data-table';
import { columns } from './columns';
import Head from 'next/head';
import ViewHeaders from '../view-headers';
import { getCookieToken } from '../../../lib/cookieToken';

export type IUserWithRole = IEmployee[] & { role: IRole };

const page = async () => {
  const token = await getCookieToken()
  const userReq = await fetch(`${apiUrl}/employee?fullInfo=true`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

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
