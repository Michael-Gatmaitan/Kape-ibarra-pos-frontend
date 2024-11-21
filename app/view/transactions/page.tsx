import Head from 'next/head'
import React from 'react'
import { DataTable } from '../data-table'
import { apiUrl } from '../../../lib/apiUrl'
import { ITransaction } from '../../..'
import { columns } from './columns'
import ViewHeaders from '../view-headers'

const page = async () => {
  const transactionReq = await fetch(`${apiUrl}/transaction`, { cache: 'no-cache' });

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
