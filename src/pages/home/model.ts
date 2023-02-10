import { filtersApplied, filtersSubmitted } from '@/features/filters-list';
import { getAllProducts } from '@/shared/api/mock/endpoints';
import { Product } from '@/shared/api/mock/types';
import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

const getProductsFx = createEffect(getAllProducts);

export const $products = createStore<Product[]>([]);
export const $displayProducts = createStore<Product[]>([]);
export const $maxPrice = createStore<number>(0);
export const $minPrice = createStore<number>(0);

export const Gate = createGate();

filtersApplied.watch((_) => console.log(_));

sample({
  clock: Gate.open,
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
