"use client";
import React, { useState } from 'react'
import DisplayCategories from './product-section/DisplayCategories'
import DisplayProducts from './product-section/DisplayProducts';
import { ICategory } from '../../../..';

const ProductSection = ({ categories }: { categories: ICategory[] }) => {
  const [active, setActive] = useState<string>('');

  return (
    // <div>
    <div className='md:h-[calc(100vh-16px)] overflow-auto pb-2 rounded-sm no-scrollbar'>
      {/* <div className="text-2xl font-bold">Categories</div> */}
      <DisplayCategories active={active} setActive={setActive} categories={categories} />
      <DisplayProducts active={active} />
    </div>
  )
}

export default ProductSection
