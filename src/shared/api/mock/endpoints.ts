import { categories, products } from './mock-data';
import { Product } from './types';

const DELAY_TIME = 200;

type EndpointCreator = <T extends any[], R extends any>(
  fn: (...args: T) => R
) => (...args: T) => Promise<R>;

const createEndpoint: EndpointCreator =
  (fn) =>
  (...args) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(fn(...args)), DELAY_TIME);
    });

const limitResponse = <T extends any[]>(res: T, limit: number) =>
  res.slice(0, limit || undefined) as T;

export const getAllProducts = createEndpoint((limit: number, page = 0) => {
  const startIndex = limit * page;
  return products.slice(startIndex, limit);
});

export const getProductById = createEndpoint(
  (id: number | string) =>
    products.find((product) => product.id === Number(id)) || ([] as Product[])
);

export const getProductsByIds = createEndpoint((ids: (string | number)[]) => {
  const numberIds = ids.map(Number);
  return products.filter((product) => numberIds.includes(product.id));
});

export const getProductsByName = createEndpoint(
  (name: string, limit: number = 0) =>
    limitResponse(
      products.filter((product) => product.title.search(name) >= 0),
      limit
    )
);

export const getAllCategories = createEndpoint(() => categories);

export const getCategoryById = createEndpoint((id: number | string) =>
  categories.find((cat) => cat.id === Number(id))
);

export const getCategoriesByName = createEndpoint(
  (name: string, limit: number = 0) =>
    limitResponse(
      categories.filter((cat) => cat.name.search(name) >= 0),
      limit
    )
);
