import React, { Suspense, useState } from 'react'
import { ICategory, IProduct } from '../../../../..';
import SearchBar from './SearchBar';
import ProductCards from './ProductCards';
import { useDebounce } from '../../../../../lib/customHooks';

export type IProdutWithCategory = IProduct & { category: ICategory }

const DisplayProducts = (props: { active: string }) => {
  const { active } = props;

  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);

  return (
    <React.Fragment>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />

      <div className='grid gap-2 grid-cols-autoFitProduct'>

        <Suspense fallback={<div>Loadingggggggggggggggggg</div>}>
          <ProductCards active={active} keyword={debouncedKeyword} />
        </Suspense>
      </div>
    </React.Fragment>
  )
};

export default DisplayProducts