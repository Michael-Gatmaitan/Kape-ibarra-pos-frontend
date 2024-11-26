import LoginForm from '../../../../components/auth/LoginForm';
import React from 'react'

const page = () => {
  return (
    <div className='h-svh flex justify-center items-center'>
      <LoginForm loginType='employee' />
    </div>
  )
}

export default page
