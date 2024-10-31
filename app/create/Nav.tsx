import Link from 'next/link'
import React from 'react'
import { Button } from '../../components/ui/button'

const Nav = () => {
  return (
    <div>
      <div className="font-bold text-2xl">Select what to create</div>


      <div className="flex gap-2">
        <Button variant='outline' asChild><Link href="/create/branch">Branch</Link></Button>
        <Button variant='outline' asChild><Link href="/create/user">User</Link></Button>
        <Button variant='outline' asChild><Link href="/create/product-category">Product Category</Link></Button>
        <Button variant='outline' asChild><Link href="/create/product">Product</Link></Button>
      </div>
    </div>
  )
}

export default Nav
