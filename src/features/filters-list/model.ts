import { Product } from '@/shared/api/mock/types';
import { createEvent, createStore, sample } from 'effector';

export enum FilterNames {
  ONE_DAY_SHIPPING,
  PRICE,
}

export type Filter = (arr: Product[]) => Product[];
export type WrappedFilter = () => Filter;
export type FilterPayload = { name: FilterNames; filter: Filter };

export const filterAdded = createEvent<FilterPayload>();
export const filterRemoved = createEvent<FilterPayload['name']>();
export const filtersSubmitted = createEvent();
export const filtersApplied = createEvent<Filter[]>();

export const $currentFilters = createStore<FilterPayload[]>([]);

$currentFilters.watch((_) => console.log(_));

sample({
  clock: filtersSubmitted,
  source: $currentFilters,
  fn: (filters) => filters.map(({ filter }) => filter),
  target: filtersApplied,
});

sample({
  clock: filterAdded,
  source: $currentFilters,
  fn: (currentFilters, newFilter) => [...currentFilters, newFilter],
  target: $currentFilters,
});

sample({
  clock: filterRemoved,
  source: $currentFilters,
  fn: (currentFilters, filterName) =>
    currentFilters.filter((filter) => filter.name !== filterName), // yes.jpg
  target: $currentFilters,
});
