"use client"
import React, { useState } from 'react'
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { createCategoryAction } from '../../../lib/action';

const DisplayCategories = (props: { categories: { id: number, categoryName: string }[] }) => {
  const { categories } = props;
  const [c, sc] = useState(0);
  return (
    <div className='p-4 rounded-sm bg-slate-700'>

      <Button onClick={() => sc(p => p + 1)}>Count {c}</Button>

      {categories.map(category => (
        <div key={category.id}>{category.categoryName}</div>
      ))}

      <form action={createCategoryAction}>
        <Input placeholder='Catergory name' name="category-name" />
        <Button>Create</Button>
      </form>
    </div>
  )
}

export default DisplayCategories
