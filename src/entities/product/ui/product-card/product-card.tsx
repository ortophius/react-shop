import { Product } from '@/shared/api/mock/types';
import { LazyImg } from '@/shared/ui/lazy-img/lazy-img';
import styles from './product-card.module.scss';

export const ProductCard = ({
  title,
  images,
  price,
  category,
  oneDayShipping,
}: Product) => (
  <div className={styles.card}>
    <div className={styles.image}>
      <LazyImg src={images[0]} alt={title} key={images[0]} />
    </div>
    <div className={styles.info}>
      <div className={styles.title}>{title}</div>
      <div className={styles.category}>{category.name}</div>
      <div>{price} ₤</div>
      <div className={styles['one-day-shipping']}>
        {oneDayShipping && 'Доставка сегодня'}
      </div>
    </div>
  </div>
);
