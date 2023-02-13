import { Product } from '@/shared/api/mock/types';
import { contract } from '@/shared/lib/contract';
import { Header } from '@/widgets/header';
import { ProductInfo } from '@/widgets/product-info';
import { useEvent, useStore } from 'effector-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { $product, pageGate, readyToLoadProduct } from './model';

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const loadProduct = useEvent(readyToLoadProduct);
  const product = useStore($product);

  useEffect(() => {
    loadProduct(Number(id) as Product['id']);
  }, [id]);

  return (
    <>
      <Header />
      {product !== null && <ProductInfo {...product} />}
    </>
  );
};

export const ProductPage = contract(Page, pageGate);
