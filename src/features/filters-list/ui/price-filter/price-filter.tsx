import { Product } from '@/shared/api/mock/types';
import MultiRangeSlider, { ChangeResult } from 'multi-range-slider-react';
import { useEffect, useState } from 'react';
import { useFiltersList } from '../../lib/use-filters-list';
import { FilterNames } from '../../model';
import styles from './price-filter.module.scss';

type PriceFilterProps = {
  min: number;
  max: number;
};

export const PriceFilter = ({ min, max }: PriceFilterProps) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  const handleSliderChange = (e: ChangeResult) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  const filter = (products: Product[]) =>
    maxValue
      ? products.filter(({ price }) => price >= minValue && price <= maxValue)
      : products;

  useEffect(() => {
    setMinValue(min);
    setMaxValue(max);
  }, [min, max]);

  useFiltersList({ name: FilterNames.PRICE, filter }, [minValue, maxValue]);

  return (
    <div className={styles['price-filter']}>
      <div className={styles.title}>Цена</div>
      <div className={styles.labels}>
        <span>от:</span>
        <span>до:</span>
      </div>
      <MultiRangeSlider
        min={min}
        max={max}
        step={5}
        minValue={minValue}
        maxValue={maxValue}
        ruler={false}
        label={false}
        thumbLeftColor="#262626"
        thumbRightColor="#262626"
        barInnerColor="#262626"
        barLeftColor="#e9e9e9"
        barRightColor="#e9e9e9"
        className={styles.slider}
        onInput={handleSliderChange}
      />
    </div>
  );
};
