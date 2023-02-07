import styles from './header.module.scss';
import Logo from '@/shared/ui/assets/logo.svg';
import { NavLink } from 'react-router-dom';
import { paths } from '@/shared/lib/config/paths';
import { Button } from '@/shared/ui/components/button';
import { BasketButton } from '@/entities/basket';

export const Header = () => (
  <div className={styles.header}>
    <div className={styles.left}>
      <div className={styles.logo}>
        <NavLink to={paths.home()}>
          <Logo />
        </NavLink>
      </div>
    </div>
    <div className={styles.right}>
      <BasketButton />
    </div>
  </div>
);
