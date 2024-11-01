import React from 'react'
import DisplayCategories from './DisplayCategories';
import { apiUrl } from '../../../lib/apiUrl';

const page = async () => {

  const categories = await fetch(`${apiUrl}/category`).then(res => res.json());

  return (
    <div>
      <DisplayCategories categories={categories} />

      Lets create some product category pffff
    </div>
  )
}

export default page
