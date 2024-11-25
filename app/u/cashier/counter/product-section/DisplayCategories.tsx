"use client";

import React, { SetStateAction } from 'react'
// import { useCategories } from '../../../../../lib/customHooks';
import { ICategory } from '../../../../..';
import { Button } from '../../../../../components/ui/button';
import { ScrollArea, ScrollBar } from '../../../../../components/ui/scroll-area';

const DisplayCategories = (props: { active: string, setActive: React.Dispatch<SetStateAction<string>>, categories: ICategory[] }) => {
  const { active, setActive, categories } = props;

  return (
    <ScrollArea>
      <div className='w-full rounded-md max-w-full overflow-x-auto flex gap-4'>

        <Button className='p-14' variant={active === '' ? 'default' : 'outline'} onClick={() => setActive("")}>
          All
        </Button>
        {categories?.map(category => (
          <Button className='p-14' variant={active === category.categoryName ? 'default' : 'outline'} key={category.id} onClick={() => setActive(category.categoryName)}>
            {category.categoryName}
          </Button>
        ))}
      </div>

      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}

export default DisplayCategories
