import React from 'react'
import BackLink from '../../../components/BackLink'
import FormContent from './FormContent'
import { apiUrl } from '../../../lib/apiUrl'
import { IRawMaterial } from '../../..'
import Link from 'next/link'
import { Button } from '../../../components/ui/button'
import { getCookieToken } from '../../../lib/cookieToken'

const page = async () => {

  const token = await getCookieToken()

  const response = await fetch(`${apiUrl}/raw-material`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  const rawMaterials: IRawMaterial[] = await response.json();

  if (rawMaterials.length === 0) {
    return (
      <div>
        <div>You need to create raw material at least one to create a product</div>
        <Button asChild>
          <Link href="/create/raw-material">Create raw material</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <BackLink href="/view/products" buttonTitle='Product list' />
      <FormContent type='create' rawMaterials={rawMaterials} />
    </div>
  )
}

export default page
