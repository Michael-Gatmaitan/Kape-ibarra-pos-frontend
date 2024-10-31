import React from 'react'
import { apiUrl } from '../../../lib/apiUrl'
import { Input } from '../../../components/ui/input';
import { createCategory } from './action';
import { Button } from '../../../components/ui/button';

const page = async () => {

  const categories = await fetch(`${apiUrl}/category`).then(res => res.json());

  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>{category.categoryName}</div>
      ))}


      <form action={createCategory}>
        <Input placeholder='Catergory name' name="category-name" />
        <Button>Create</Button>
      </form>


      Lets create some product category pffff
    </div>
  )
}

export default page
