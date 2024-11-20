import React, { useEffect, useState } from 'react'
import { ICategory, IProduct } from '../../../../..';
import { apiUrl } from '../../../../../lib/apiUrl';
import ProductCard from './ProductCard';
import { useAppSelector } from '../../../../../lib/hooks';
import { selectOrderItemsBody } from '../../../../../lib/features/order/orderSlice';

type IProdutWithCategory = IProduct & { category: ICategory }

const DisplayProducts = (props: { active: string }) => {
  const { active } = props;
  const [products, setProducts] = useState<IProdutWithCategory[]>([]);

  const orderItems = useAppSelector(selectOrderItemsBody);

  useEffect(() => {
    const getProductsFunc = async () => {
      const getProducts = await fetch(`${apiUrl}/product?categoryName=${active}`, { cache: 'no-cache' });
      if (!getProducts.ok)
        console.log('Something went wrong getting products');

      const productResult: IProdutWithCategory[] = await getProducts.json();
      setProducts(productResult);
    }

    getProductsFunc();
  }, [active]);

  return (
    // md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
    // repeat(auto-fill, minmax(200px, 1fr))
    <div className='grid gap-2 grid-cols-autoFitProduct'>

      {products.length !== 0 ? products.map((product) => (
        <ProductCard key={product.id} product={product} orderItems={orderItems} />
      )
      ) : <div>No products available</div>}
    </div>
  )
};

export default DisplayProducts