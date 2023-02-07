import { Button } from '@/shared/ui/components/button';
import styles from './basket-button.module.scss';

export const BasketButton = () => (
  <Button theme="light" className={styles.basket}>
    <i className="icon-basket" />
  </Button>
);
