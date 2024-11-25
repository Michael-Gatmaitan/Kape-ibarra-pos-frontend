"use client";
import React, { useEffect, useState, memo, Suspense } from 'react'
import { IProdutWithCategory } from './DisplayProducts';
import { useAppSelector } from '../../../../../lib/hooks';
// import ProductCard from './ProductCard';
import { selectOrderItemsBody } from '../../../../../lib/features/order/orderSlice';
import { apiUrl } from '../../../../../lib/apiUrl';
import { Skeleton } from '../../../../../components/ui/skeleton';

const ProductCard = React.lazy(() => import('./ProductCard'));

const ProductCards = memo(function ProductCards({ active, keyword }: { active: string, keyword: string }) {
  const [products, setProducts] = useState<IProdutWithCategory[]>([]);
  const orderItems = useAppSelector(selectOrderItemsBody);

  useEffect(() => {
    const getProductsFunc = async () => {
      const getProducts = await fetch(`${apiUrl}/product?categoryName=${active}&productName=${keyword}`, { cache: 'no-cache' });
      if (!getProducts.ok)
        console.log('Something went wrong getting products');

      const productResult: IProdutWithCategory[] = await getProducts.json();
      setProducts(productResult);
    }

    getProductsFunc();
  }, [active, keyword]);

  if (products.length === 0) {
    return <div>No products available</div>
  }

  return (
    <>
      {products.map(product => (
        <Suspense fallback={<Skeleton className='h-40'>Loading product</Skeleton>} key={product.id}>
          <ProductCard product={product} orderItems={orderItems} />
        </Suspense>
      ))}
    </>
  )
});

export default ProductCards
