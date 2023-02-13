import {
  FiltersList,
  PriceFilter,
  ShippingFilter,
} from '@/features/filters-list';
import { getAllProducts } from '@/shared/api/mock/endpoints';
import { contract } from '@/shared/lib/contract';
import { ProductList } from '@/widgets/product-list/product-list';
import { useStore } from 'effector-react';
import { Header } from '../../widgets/header';
import { $displayProducts, $maxPrice, $minPrice, $products, Gate } from './model';
import styles from './styles.module.scss';

const Page = () => {
  const products = useStore($displayProducts);
  const minPrice = useStore($minPrice);
  const maxPrice = useStore($maxPrice);

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

export const HomePage = contract(Page, Gate);
