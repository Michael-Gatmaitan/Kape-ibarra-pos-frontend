import Head from 'next/head'
import React from 'react'
import { DataTable } from '../data-table'
import { apiUrl } from '../../../lib/apiUrl'
import { ITransaction } from '../../..'
import { columns } from './columns'
import ViewHeaders from '../view-headers'
import { cookies } from 'next/headers'

const page = async () => {
  const token = cookies().get('token')?.value;
  const transactionReq = await fetch(`${apiUrl}/transaction`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  if (!transactionReq.ok) {
    return <div>Something went wrong gettgin all transaction</div>
  }

  const transactions: ITransaction[] = await transactionReq.json();

  return (
    <div>

      <Head>
        <title>List of Transactions</title>
      </Head>

      <header>
        <ViewHeaders headerTitle='Transaction List' />
      </header>

      <DataTable data={transactions} columns={columns} />

    </div>
  )
}

export default page
