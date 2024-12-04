import React from 'react'
import CreateEWalletForm from './CreateEWalletForm'
import { apiUrl } from '../../../lib/apiUrl'
import { IEWallet } from '../../..';
import { getCookieToken } from '../../../lib/cookieToken';

const page = async () => {
  const token = await getCookieToken();
  const eWalletReq = await fetch(`${apiUrl}/e-wallet`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  if (!eWalletReq.ok) {
    return <div>There was a problem in getting ewallet req</div>
  }

  const eWalletRes: IEWallet = await eWalletReq.json();

  return (
    <div>

      {eWalletRes?.name ? (
        <>
          <div className='p-2 bg-secondary'>{eWalletRes.name}</div>
          <div className='p-2 bg-secondary'>{eWalletRes.phoneNumber}</div>
        </>
      ) : null}

      <CreateEWalletForm eWallet={eWalletRes} />
    </div>
  )
}

export default page
