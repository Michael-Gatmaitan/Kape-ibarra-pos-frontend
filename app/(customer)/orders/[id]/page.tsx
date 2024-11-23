import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      Customer order by id {id} page
    </div>
  )
}

export default page
