import React from 'react'
import { apiUrl } from '../../../../lib/apiUrl'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const customerReq = await fetch(`${apiUrl}/customer/${id}`);
  if (!customerReq.ok) {
    return <div>Customer with id of {id} not found</div>
  }
  return (
    <div>
      Customer {id}
    </div>
  )
}

export default page
