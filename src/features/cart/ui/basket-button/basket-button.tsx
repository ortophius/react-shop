import { paths } from '@/shared/lib/config/paths';
import { contract } from '@/shared/lib/contract';
import { Button } from '@/shared/ui/components/button';
import { useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { $itemsCount, cartGate } from '../../model';
import styles from './basket-button.module.scss';

export const BasketButtonComponent = () => {
  const count = useStore($itemsCount);
  const navigate = useNavigate();

  return (
    <Button
      theme="light"
      className={styles.basket}
      onClick={() => navigate(paths.cart())}
    >
      <i className="icon-basket" />
      {Boolean(count) && <div className={styles['items-count']}>{count}</div>}
    </Button>
  );
};

export const BasketButton = contract(BasketButtonComponent, cartGate);
