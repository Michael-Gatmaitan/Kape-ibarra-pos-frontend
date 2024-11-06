import React from 'react'
import BackLink from '../../../components/BackLink'
import FormContent from './FormContent'

const page = () => {
  return (
    <div>
      <BackLink href="/product" buttonTitle='Product list' />
      <FormContent type='create' />
    </div>
  )
}

export default page
