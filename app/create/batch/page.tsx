import React from 'react';
import FormContent from './FormContent';
import { cookies } from 'next/headers';
import { apiUrl } from '../../../lib/apiUrl';
import { IRawMaterial } from '../../..';
// import FormContent from '../category/FormContent';

const page = async () => {
  const token = cookies().get("token")?.value;
  const rawMaterialsReq = await fetch(`${apiUrl}/raw-material`, {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  console.log(rawMaterialsReq);

  const res: IRawMaterial[] = await rawMaterialsReq.json();

  return (
    <div>
      <FormContent rawMaterials={res} />
    </div>
  )
}

export default page
