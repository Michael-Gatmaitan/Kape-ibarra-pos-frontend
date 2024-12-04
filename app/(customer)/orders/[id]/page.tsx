import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div>
      Customer order by id {id} page
    </div>
  )
}

export default page
