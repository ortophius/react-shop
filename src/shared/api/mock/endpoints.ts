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

export const getAllProducts = createEndpoint(() => {
  return products;
});

export const getProductById = createEndpoint(
  (id: number | string) =>
    products.find((product) => product.id === Number(id)) || null
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

export const getProductsByCategory = createEndpoint((categoryName: string) => {
  const res = products.filter(
    (product) =>
      product.category.name.toUpperCase() === categoryName.toUpperCase()
  );
  return res;
});

export const getAllCategories = createEndpoint(() => categories);

export const getCategoryById = createEndpoint((id: number | string) =>
  categories.find((cat) => cat.id === Number(id))
);

export const getCategoriesByName = createEndpoint(
  (name: string, limit: number = 0) =>
    limitResponse(
      categories.filter(
        (cat) => cat.name.toUpperCase().search(name.toUpperCase()) >= 0
      ),
      limit
    )
);
