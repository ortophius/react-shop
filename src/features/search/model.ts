import {
  getCategoriesByName,
  getProductsByName,
} from '@/shared/api/mock/endpoints';
import { Category, Product } from '@/shared/api/mock/types';
import {
  createEffect,
  createStore,
  createEvent,
  sample,
  restore,
} from 'effector';
import { v4 } from 'uuid';

type RequestPayload<T> = T & { id: string };

export const getSearchModel = () => {
  const getProductsFx = createEffect(
    async ({ name, id }: RequestPayload<{ name: string }>) =>
      await getProductsByName(name, 5)
  );
  const getCategoriesFx = createEffect(
    async ({ name, id }: RequestPayload<{ name: string }>) =>
      await getCategoriesByName(name, 5)
  );

  const queryChanged = createEvent<string>();
  const searchInvoked = createEvent();
  const toggleSuggestions = createEvent<boolean>();
  const requestsSent = createEvent<RequestPayload<{ name: string }>>();

  const $currentRequestId = createStore<string>('');
  const $query = restore<string>(queryChanged, '');
  const $productsResults = createStore<Product[]>([]);
  const $categoriesResults = createStore<Category[]>([]);

  const $showSuggestions = createStore(false);

  sample({
    source: toggleSuggestions,
    filter: (value) => !value,
    fn: () => '',
    target: $query,
  });

  sample({
    clock: requestsSent,
    fn: ({ id }) => id,
    target: $currentRequestId,
  });

  sample({
    source: toggleSuggestions,
    target: $showSuggestions,
  });

  sample({
    clock: [$productsResults, $categoriesResults],
    fn: () => true,
    target: toggleSuggestions,
  });

  sample({
    clock: $query,
    filter: (query) => Boolean(query),
    target: searchInvoked,
  });

  sample({
    clock: searchInvoked,
    source: $query,
    fn: (query) => ({ name: query, id: v4() }),
    target: [getProductsFx, getCategoriesFx, requestsSent],
  });

  sample({
    clock: getProductsFx.done,
    source: $currentRequestId,
    filter: (currentId, { params: { id: requestId } }) => currentId === requestId,
    fn: (_, { result }) => result,
    target: $productsResults,
  });

  sample({
    clock: getCategoriesFx.done,
    source: $currentRequestId,
    filter: (currentId, { params: { id: requestId } }) => currentId === requestId,
    fn: (_, { result }) => result,
    target: $categoriesResults,
  });

  // queryChanged.watch(() => console.log('queryChanged'));
  // $productsResults.watch((_) => console.log(_));
  // getProductsFx.watch((_) => console.log(_));

  return {
    $productsResults,
    $categoriesResults,
    $showSuggestions,
    searchInvoked,
    queryChanged,
    toggleSuggestions,
  };
};
