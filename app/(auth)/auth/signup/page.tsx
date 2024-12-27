import SignupForm from '../../../../components/auth/SignupForm'
import React from 'react'
import { getCookieToken } from '../../../../lib/cookieToken'
import { apiUrl } from '../../../../lib/apiUrl';
import { IRole } from '../../../..';

const page = async () => {
  const token = await getCookieToken();
  const rolesReq = await fetch(`${apiUrl}/role`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  if (rolesReq.status === 403) {
  }

  if (!rolesReq.ok) {
    return <div>Getting roles error in signup employee</div>
  }

  const roles: IRole[] = await rolesReq.json();

  return (
    <div className='flex justify-center items-start'>

      <SignupForm roles={roles} />
    </div>
  )
}

export default page
