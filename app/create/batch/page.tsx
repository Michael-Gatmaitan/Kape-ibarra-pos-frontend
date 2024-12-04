import React from 'react';
import FormContent from './FormContent';
import { apiUrl } from '../../../lib/apiUrl';
import { IRawMaterial } from '../../..';
import { getCookieToken } from '../../../lib/cookieToken';
// import FormContent from '../category/FormContent';

const page = async () => {
  const token = await getCookieToken();
  const rawMaterialsReq = await fetch(`${apiUrl}/raw-material`, {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  console.log(rawMaterialsReq);

  const res: IRawMaterial[] = await rawMaterialsReq.json();

  const d = new Date();

  return (
    <div>
      <FormContent rawMaterials={res} initialDateVal={d} />
    </div>
  )
}

export default page
