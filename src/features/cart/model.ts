import { getProductsByIds } from '@/shared/api/mock/endpoints';
import { Product } from '@/shared/api/mock/types';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

type CartItemKey = Product['id'];
type Cart = Record<CartItemKey, number>;

const LOCALSTORAGE_KEY = 'cart';

export const cartGate = createGate();

const getCartFromLocalStorageFx = createEffect(
  () => JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '[]') as Cart
);

const saveCartToLocalStorageFx = createEffect((cart: Cart) =>
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(cart))
);

const getcartProductsFx = createEffect(getProductsByIds);

export const addToCart = createEvent<CartItemKey>();
export const removeFromCart = createEvent<CartItemKey>();

export const $cart = createStore<Cart>({});
export const $cartItems = createStore<Product[]>([]);
export const $itemsCount = createStore<number>(0);
export const $total = createStore<number>(0);

sample({
  clock: cartGate.open,
  target: getCartFromLocalStorageFx,
});

sample({
  source: getCartFromLocalStorageFx.doneData,
  target: $cart,
});

sample({
  clock: addToCart,
  source: $cart,
  fn: (cart, itemId) =>
    cart[itemId]
      ? { ...cart, [itemId]: ++cart[itemId] }
      : { ...cart, [itemId]: 1 },
  target: $cart,
});

sample({
  clock: removeFromCart,
  source: $cart,
  fn: (cart, itemId) => {
    const res = { ...cart, [itemId]: --cart[itemId] };
    if (!res[itemId]) delete res[itemId];
    return res;
  },
  target: $cart,
});

sample({
  source: $cart,
  target: saveCartToLocalStorageFx,
});

sample({
  source: $cart,
  fn: (cart) => Object.keys(cart),
  target: getcartProductsFx,
});

sample({
  source: getcartProductsFx.doneData,
  target: $cartItems,
});

sample({
  source: $cart,
  fn: (cart) =>
    Object.keys(cart).reduce((count, id) => count + cart[Number(id)], 0),
  target: $itemsCount,
});

sample({
  clock: $cartItems,
  source: { cart: $cart, items: $cartItems },
  fn: ({ cart, items }) =>
    items.reduce((total, item) => total + item.price * cart[item.id], 0),
  target: $total,
});
