import { filtersApplied, filtersSubmitted } from '@/features/filters-list';
import { getProductsByCategory } from '@/shared/api/mock/endpoints';
import { Product } from '@/shared/api/mock/types';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

export const pageGate = createGate();

const getProductsFx = createEffect(getProductsByCategory);

export const readyToLoadProducts = createEvent<string>();
export const $products = createStore<Product[]>([]);
export const $displayProducts = createStore<Product[]>([]).reset(pageGate.close);
export const $maxPrice = createStore<number>(0);
export const $minPrice = createStore<number>(0);

sample({
  clock: readyToLoadProducts,
  target: getProductsFx,
});

sample({
  source: getProductsFx.doneData,
  target: $products,
});

sample({
  clock: $products,
  target: filtersSubmitted,
});

sample({
  clock: filtersApplied,
  source: $products,
  fn: (products, filters) =>
    filters.reduce((res, filter) => {
      return filter(res);
    }, products),
  target: $displayProducts,
});

sample({
  source: $products,
  fn: (products) => Math.min(...products.map(({ price }) => price)),
  target: $minPrice,
});

sample({
  source: $products,
  fn: (products) => Math.max(...products.map(({ price }) => price)),
  target: $maxPrice,
});
