import LoginForm from '../../../../components/auth/LoginForm';
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-start'>
      <LoginForm loginType='employee' />
    </div>
  )
}

export default page
