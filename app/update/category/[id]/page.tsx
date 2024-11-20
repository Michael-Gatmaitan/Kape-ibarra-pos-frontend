import React from 'react'
import FormContent from '../../../create/category/FormContent';
import { apiUrl } from '../../../../lib/apiUrl';
import { TCategorySchema } from '../../../../lib/types';
import { ICategory } from '../../../..';
import BackLink from '../../../../components/BackLink';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const categoriesReq = await fetch(`${apiUrl}/category`, { cache: 'no-cache' });
  const categories: ICategory[] = await categoriesReq.json();

  const categoryToEdit = await fetch(`${apiUrl}/category/${id}`);

  if (!categoryToEdit.ok) return <div>Something went wrong</div>

  const res: TCategorySchema & ICategory = await categoryToEdit.json();

  return (
    <div>
      <BackLink buttonTitle='Category list' href="/view/categories" />
      <FormContent type="update" categoryDefaultValues={res} />

      {categories.map(({ id, categoryName }) => (
        <div key={id} className='p-4 bg-red-600 text-white rounded-md my-4'>
          <div>{id}</div>
          <div>{categoryName}</div>
        </div>
      ))}
    </div>
  )
}

export default page
