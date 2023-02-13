import { $cart, addToCart, removeFromCart } from '@/features/cart';
import { AddToCart } from '@/features/cart/ui/add-to-cart/add-to-cart';
import { Product } from '@/shared/api/mock/types';
import { paths } from '@/shared/lib/config/paths';
import { LazyImg } from '@/shared/ui/components/lazy-img/lazy-img';
import clsx from 'clsx';
import { useEvent, useStore } from 'effector-react';
import { NavLink } from 'react-router-dom';
import styles from './product-card.module.scss';

export const ProductCard = ({
  id,
  title,
  images,
  price,
  category,
  oneDayShipping,
  rating,
}: Product) => {
  return (
    <div className={styles.card}>
      <NavLink to={paths.product(id.toString())} className={styles.image}>
        <LazyImg src={images[0]} alt={title} key={images[0]} />
      </NavLink>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.rating}>
          {Array(rating)
            .fill(true)
            .map((_, i) => (
              <i className={clsx('icon-star', styles.filled)} key={i} />
            ))}
          {Array(5 - rating)
            .fill(true)
            .map((_, i) => (
              <i className="icon-star" key={i} />
            ))}
        </div>
        <NavLink to={paths.category(category.name)} className={styles.category}>
          {category.name}
        </NavLink>
        <div>{price} ₤</div>
        <div className={styles['one-day-shipping']}>
          {oneDayShipping && 'Доставка сегодня'}
        </div>
        <AddToCart id={id} />
      </div>
    </div>
  );
};
