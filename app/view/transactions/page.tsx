import React from 'react'
import { DataTable } from '../data-table'
import { apiUrl } from '../../../lib/apiUrl'
import { ITransaction } from '../../..'
import { columns } from './columns'
import ViewHeaders from '../view-headers'
import { getCookieToken } from '../../../lib/cookieToken'

const page = async () => {
  const token = await getCookieToken()
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
      <header>
        <ViewHeaders headerTitle='Transaction List' />
      </header>

      <DataTable data={transactions} columns={columns} />

    </div>
  )
}

export default page
