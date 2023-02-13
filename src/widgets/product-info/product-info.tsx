import { AddToCart } from '@/features/cart/ui/add-to-cart/add-to-cart';
import { Product } from '@/shared/api/mock/types';
import { LazyImg } from '@/shared/ui/components/lazy-img/lazy-img';
import styles from './product-info.module.scss';

export const ProductInfo = ({
  id,
  title,
  images,
  description,
  price,
}: Product) => (
  <div className={styles['product-info']}>
    <div className={styles.title}>{title}</div>
    <ul className={styles.images}>
      {images.map((image) => (
        <li className={styles.image}>
          <LazyImg src={image} alt={title} />
        </li>
      ))}
    </ul>
    <p>{description}</p>
    <div className={styles.price}>Цена: {price} ₤</div>
    <div className={styles['add-to-cart']}>
      <AddToCart id={id} />
    </div>
  </div>
);
