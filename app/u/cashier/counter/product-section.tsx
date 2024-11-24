"use client";
import React, { useState } from 'react'
import DisplayCategories from './product-section/DisplayCategories'
import DisplayProducts from './product-section/DisplayProducts';
import { ICategory } from '../../../..';

const ProductSection = ({ categories }: { categories: ICategory[] }) => {
  const [active, setActive] = useState<string>('all');
  return (
    // <div>
    <div className='md:max-h-screen overflow-auto'>
      <div className="text-2xl">Categories</div>
      <DisplayCategories active={active} setActive={setActive} categories={categories} />
      <DisplayProducts active={active} />
    </div>
  )
}

export default ProductSection
