import { Product } from '@/shared/api/mock/types';
import { Button } from '@/shared/ui/components/button';
import { Select } from '@/shared/ui/components/select/select';
import { useEvent, useStore } from 'effector-react';
import { useEffect } from 'react';
import {
  $displayProducts,
  sortDirectionChanged,
  sortTypeChanged,
  SortTypes,
  productsChanged,
  $currentSortDirection,
  SortDirections,
} from './model';
import styles from './product-list.module.scss';
import { ProductCard } from './ui/product-card/product-card';

type ProductListProps = { items: Product[] };

export const ProductList = ({ items }: ProductListProps) => {
  const { changeSortDirection, changeProducts, changeSortType } = useEvent({
    changeProducts: productsChanged,
    changeSortType: sortTypeChanged,
    changeSortDirection: sortDirectionChanged,
  });

  const products = useStore($displayProducts);
  const sortDirection = useStore($currentSortDirection);

  const toggleSortDirection = () =>
    changeSortDirection(
      sortDirection === SortDirections.ASC
        ? SortDirections.DESC
        : SortDirections.ASC
    );

  useEffect(() => {
    changeProducts(items);
  }, [items]);

  return (
    <div>
      <div className={styles.sorting}>
        <Button
          theme="dark"
          className={styles['sort-button']}
          onClick={toggleSortDirection}
        >
          {sortDirection === SortDirections.ASC ? (
            <i className="icon-sort" />
          ) : (
            <i className="icon-sort-down" />
          )}
        </Button>
        <Select
          items={[
            { title: 'По названию', value: SortTypes.BY_NAME },
            { title: 'По цене', value: SortTypes.BY_PRICE },
            { title: 'По рейтингу', value: SortTypes.BY_RATING },
          ]}
          onChange={(v) => {
            changeSortType(v as SortTypes);
          }}
        />
      </div>
      <div className={styles.list}>
        {products.map((item) => (
          <ProductCard {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
