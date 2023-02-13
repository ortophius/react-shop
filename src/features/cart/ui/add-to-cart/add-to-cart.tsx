import { Product } from '@/shared/api/mock/types';
import { Button } from '@/shared/ui/components/button';
import { useEvent, useStore } from 'effector-react';
import { $cart, addToCart, removeFromCart } from '../../model';
import styles from './add-to-cart.module.scss';

type AddToCartProps = {
  id: Product['id'];
};

export const AddToCart = ({ id }: AddToCartProps) => {
  const cart = useStore($cart);
  const { add, remove } = useEvent({ add: addToCart, remove: removeFromCart });

  return (
    <div className={styles['add-to-cart']}>
      {Boolean(cart[id]) ? (
        <>
          <Button
            onClick={() => {
              remove(id);
            }}
          >
            -
          </Button>
          {cart[id]}
          <Button
            onClick={() => {
              add(id);
            }}
          >
            +
          </Button>
        </>
      ) : (
        <Button
          onClick={() => {
            add(id);
          }}
        >
          В корзину
        </Button>
      )}
    </div>
  );
};
