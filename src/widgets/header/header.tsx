import styles from './header.module.scss';
import Logo from '@/shared/ui/assets/logo.svg';
import { NavLink } from 'react-router-dom';
import { paths } from '@/shared/lib/config/paths';
import { Button } from '@/shared/ui/components/button';
import { BasketButton } from '@/entities/basket';
import { Search } from '@/features/search';
import { useState } from 'react';
import clsx from 'clsx';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <NavLink to={paths.home()}>
            <Logo />
          </NavLink>
        </div>
      </div>
      <div className={styles.search}>
        <Search />
      </div>
      <div className={styles.right}>
        <div className={styles.basket}>
          <BasketButton />
        </div>
        <Button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <i className="icon-cancel" /> : <i className="icon-menu" />}
        </Button>
        <div className={clsx(styles['mobile-menu'], { [styles.open]: menuOpen })}>
          <Search />
          <BasketButton />
        </div>
      </div>
    </div>
  );
};
