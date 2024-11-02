import React from 'react'
import BackLink from '../../../components/BackLink'
import FormContent from './FormContent'

const page = () => {
  return (
    <div>
      <BackLink href="/product" buttonTitle='Product list' />
      <FormContent />
    </div>
  )
}

export default page
