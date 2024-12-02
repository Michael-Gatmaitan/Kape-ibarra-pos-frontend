import Head from 'next/head'
import React from 'react'
import { DataTable } from '../data-table'
import { apiUrl } from '../../../lib/apiUrl'
import { IInventory, IRawMaterial } from '../../..'
import { columns } from './columns'
import ViewHeaders from '../view-headers'
import { getCookieToken } from '../../../lib/cookieToken'

export type InventoryWithRawMaterial = IInventory[] & { rawMaterial: IRawMaterial }

const page = async () => {
  const token = await getCookieToken()
  const inventoryReq = await fetch(`${apiUrl}/inventory`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  if (!inventoryReq.ok) {
    return <div>Something went wrong gettgin all transaction</div>
  }

  const inventories: InventoryWithRawMaterial[] = await inventoryReq.json();

  return (
    <div>

      <Head>
        <title>List of Transactions</title>
      </Head>

      <header>
        <ViewHeaders headerTitle='Transaction List' />
      </header>

      <DataTable data={inventories} columns={columns} />

    </div>
  )
}

export default page
