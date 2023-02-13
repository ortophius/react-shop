import { $cartItems, $total } from '@/features/cart/model';
import { paths } from '@/shared/lib/config/paths';
import { Button } from '@/shared/ui/components/button';
import { useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import styles from './cart-layout.module.scss';
import { ProductRow } from './ui/product-row/product-row';

export const CartLayout = () => {
  const products = useStore($cartItems);
  const total = useStore($total);
  const navigate = useNavigate();

  return (
    <div className={styles['cart-layout']}>
      <div className={styles.products}>
        {products.map((product) => (
          <ProductRow {...product} />
        ))}
      </div>
      <aside className={styles.aside}>
        <div className={styles['aside-content']}>
          <div className={styles.total}>
            Итого: <span className={styles.price}>{total} ₤</span>
          </div>
          <Button className={styles.pay} onClick={() => navigate(paths.order())}>
            Перейти к оплате
          </Button>
        </div>
      </aside>
    </div>
  );
};
