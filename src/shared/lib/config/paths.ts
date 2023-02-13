type AnyArr = readonly unknown[];

export const paths = {
  home: () => '/',
  category: (category: string) => `/category/${category}`,
  product: (product: string) => `/product/${product}`,
  cart: () => '/cart',
  order: () => '/order',
};
