import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      Customers product id {id} page
    </div>
  )
}

export default page
