import {
  FiltersList,
  PriceFilter,
  ShippingFilter,
} from '@/features/filters-list';
import { getAllProducts } from '@/shared/api/mock/endpoints';
import { contract } from '@/shared/lib/contract';
import { ProductList } from '@/widgets/product-list/product-list';
import { useEvent, useStore } from 'effector-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../widgets/header';
import {
  $displayProducts,
  $maxPrice,
  $minPrice,
  pageGate,
  readyToLoadProducts,
} from './model';
import styles from './styles.module.scss';

const Page = () => {
  const products = useStore($displayProducts);
  const minPrice = useStore($minPrice);
  const maxPrice = useStore($maxPrice);
  const loadProducts = useEvent(readyToLoadProducts);
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    loadProducts(category as string);
  }, [category]);

  return (
    <>
      <Header />
      <main className={styles.layout}>
        <ProductList items={products} />
        <aside className={styles.aside}>
          <div className={styles.filters}>
            <FiltersList>
              <ShippingFilter />
              <PriceFilter min={minPrice} max={maxPrice} />
            </FiltersList>
          </div>
        </aside>
      </main>
    </>
  );
};

export const CategoryPage = contract(Page, pageGate);
