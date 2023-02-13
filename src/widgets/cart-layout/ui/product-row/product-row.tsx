import { AddToCart } from '@/features/cart/ui/add-to-cart/add-to-cart';
import { Product } from '@/shared/api/mock/types';
import { paths } from '@/shared/lib/config/paths';
import { LazyImg } from '@/shared/ui/components/lazy-img/lazy-img';
import { NavLink } from 'react-router-dom';
import styles from './product-row.module.scss';

export const ProductRow = ({ title, id, price, images, category }: Product) => (
  <div className={styles['product-row']}>
    <div className={styles['image-container']}>
      <LazyImg src={images[0]} className={styles.image} />
    </div>
    <div className={styles.info}>
      <NavLink to={paths.product(id.toString())} className={styles.title}>
        {title}
      </NavLink>
      <NavLink to={paths.category(category.name)} className={styles.category}>
        {category.name}
      </NavLink>
      <div className={styles['add-to-cart']}>
        <AddToCart id={id} />
      </div>
    </div>
  </div>
);
