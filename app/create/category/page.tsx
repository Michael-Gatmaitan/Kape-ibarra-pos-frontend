import React from 'react'
// import DisplayCategories from './DisplayCategories';
// import { apiUrl } from '../../../lib/apiUrl';
import FormContent from './FormContent';
import BackLink from '../../../components/BackLink';
// import { getSessionToken } from '../../../actions/loginAction';

const page = async () => {

  // const categories = await fetch(`${apiUrl}/category`).then(res => res.json());

  return (
    <div>
      {/* <DisplayCategories categories={categories} /> */}
      <BackLink href="/view/categories" buttonTitle='Product category list' />
      <FormContent type='create' />
    </div>
  )
}

export default page
