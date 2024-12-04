import Head from 'next/head'
import React from 'react'
import ViewHeaders from '../view-headers'
import { DataTable } from '../data-table'
import { getCookieToken } from '../../../lib/cookieToken'
import { apiUrl } from '../../../lib/apiUrl'
import { ICustomer } from '../../..'
import { columns } from './columns'

const page = async () => {
  const token = await getCookieToken()
  const customerReq = await fetch(`${apiUrl}/customer`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  if (!customerReq.ok) {
    return <div>Something went wrong gettgin all transaction</div>
  }

  const customers: ICustomer[] = await customerReq.json();

  return (
    <div>
      <Head>
        <title>I</title>
      </Head>

      <header>
        <ViewHeaders headerTitle='Customers' />
      </header>

      <DataTable data={customers} columns={columns} />
    </div>
  )
}

export default page
