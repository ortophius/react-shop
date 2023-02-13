import { getProductById } from '@/shared/api/mock/endpoints';
import { Product } from '@/shared/api/mock/types';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

export const pageGate = createGate();

const getProductFx = createEffect(getProductById);

const reset = createEvent();
export const readyToLoadProduct = createEvent<number>();
export const $product = createStore<Product | null>(null).reset(pageGate.close);

sample({
  clock: readyToLoadProduct,
  target: getProductFx,
});

sample({
  source: getProductFx.doneData,
  target: $product,
});
