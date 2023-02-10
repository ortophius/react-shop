import { Product } from '@/shared/api/mock/types';
import { createEvent, createStore, sample, restore } from 'effector';
export enum SortTypes {
  BY_NAME = 'name',
  BY_PRICE = 'price',
  BY_RATING = 'rating',
}

export enum SortDirections {
  DESC,
  ASC,
}

export const sortTypeChanged = createEvent<SortTypes>();
export const sortDirectionChanged = createEvent<SortDirections>();
export const productsChanged = createEvent<Product[]>();

export const $products = restore(productsChanged, []);
export const $displayProducts = createStore<Product[]>([]);
export const $currentSortType = restore(sortTypeChanged, SortTypes.BY_NAME);
export const $currentSortDirection = restore(
  sortDirectionChanged,
  SortDirections.ASC
);

const sortByName = (arr: Product[]) => [
  ...arr.sort((item1, item2) =>
    item1.title.toUpperCase() < item2.title.toUpperCase() ? -1 : 1
  ),
];
const sortByPrice = (arr: Product[]) => [
  ...arr.sort((item1, item2) => (item1.price < item2.price ? -1 : 1)),
];

const sortByRating = (arr: Product[]) => [
  ...arr.sort((item1, item2) => (item1.rating < item2.rating ? -1 : 1)),
];

const sorts = {
  [SortTypes.BY_NAME]: sortByName,
  [SortTypes.BY_PRICE]: sortByPrice,
  [SortTypes.BY_RATING]: sortByRating,
};

sample({
  clock: [$products, sortTypeChanged, sortDirectionChanged],
  source: {
    products: $products,
    sort: $currentSortType,
    direction: $currentSortDirection,
  },
  fn: ({ products, sort, direction }) => {
    const sortedProducts = sorts[sort](products);
    const res =
      direction === SortDirections.ASC
        ? sortedProducts
        : sortedProducts.reverse();
    return res;
  },
  target: $displayProducts,
});
