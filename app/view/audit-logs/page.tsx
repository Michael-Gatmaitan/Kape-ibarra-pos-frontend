import { cookies } from 'next/headers'
import React from 'react'
import { apiUrl } from '../../../lib/apiUrl';
import Head from 'next/head';
import ViewHeaders from '../view-headers';
import { DataTable } from '../data-table';
import { IAuditLog, ICustomer, IEmployee } from '../../..';
import { columns } from './columns';

const page = async () => {
  const token = cookies().get("token")?.value;

  const auditLogReq = await fetch(`${apiUrl}/audit-log`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  if (!auditLogReq.ok) {
    return <div>Something went wrong getting all audit logs.</div>
  }

  const auditLogs: (IAuditLog & { Employee: IEmployee; } & { Customer: ICustomer; })[] = await auditLogReq.json();

  return (
    <div>
      <Head>
        <title>List of audit logs</title>
      </Head>

      <header>
        <ViewHeaders headerTitle='Audit Logs' />
      </header>

      <DataTable data={auditLogs} columns={columns} />
    </div>
  )
}

export default page
