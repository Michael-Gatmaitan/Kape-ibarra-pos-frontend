import Head from 'next/head'
import SignupForm from '../../../../components/auth/SignupForm'
import React from 'react'

const page = () => {
  return (
    <div className='h-svh flex justify-center items-center'>
      <head>
        <Head>
          <title>Sign up</title>
        </Head>
      </head>

      <SignupForm />
    </div>
  )
}

export default page
