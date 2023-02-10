import { Product } from '@/shared/api/mock/types';
import { Checkbox } from '@/shared/ui/components/checkbox/checkbox';
import { useMemo, useState } from 'react';
import { useFiltersList } from '../../lib/use-filters-list';
import { FilterNames } from '../../model';
import styles from './shipping-filter.module.scss';

export const ShippingFilter = () => {
  const [value, setValue] = useState(false);

  const filter = (products: Product[]) =>
    value
      ? products.filter((product) => product.oneDayShipping === value)
      : products;

  const filterChangeHandler = (newValue: boolean) => {
    setValue(newValue);
  };

  useFiltersList({ name: FilterNames.ONE_DAY_SHIPPING, filter: filter }, [value]);

  return (
    <div className={styles['shipping-filter']}>
      <div className={styles.title}>Доставка</div>
      <Checkbox
        label="Доставка сегодня"
        value={value}
        onChange={filterChangeHandler}
      />
    </div>
  );
};
