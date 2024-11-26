import LoginForm from '../../../components/auth/LoginForm'
import React from 'react'
import { Button } from '../../../components/ui/button'
import Link from 'next/link'

const page = () => {
  return (
    <div className='h-svh flex justify-center items-center'>
      <LoginForm loginType='customer'>

        <Button variant='outline' className='w-full' asChild>
          <Link href="/auth/login">
            Login as employee
          </Link>
        </Button>
      </LoginForm>
    </div>
  )
}

export default page
