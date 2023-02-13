import { getSearchModel } from '@/features/search/model';
import { Product } from '@/shared/api/mock/types';
import { paths } from '@/shared/lib/config/paths';
import { Dimmer } from '@/shared/ui/components/dimmer';
import { useEvent, useStore } from 'effector-react';
import { RefObject, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import styles from './suggestions.module.scss';

type SuggestonsProps = {
  model: ReturnType<typeof getSearchModel>;
  searchRef: RefObject<HTMLElement>;
};

export const Suggestions = ({ model, searchRef }: SuggestonsProps) => {
  const toggleSuggestions = useEvent(model.toggleSuggestions);
  const products = useStore(model.$productsResults);
  const categories = useStore(model.$categoriesResults);
  return (
    <div className={styles.suggestions}>
      <Dimmer el={searchRef} onClick={() => toggleSuggestions(false)} />
      {products.length > 0 && (
        <div className={styles.section}>
          <div className={styles.label}>Товары</div>
          <ul className={styles.list}>
            {products.map((product) => (
              <li key={product.id} className={styles['product-item']}>
                <span className={styles['product-title']}>{product.title}</span>{' '}
                <NavLink
                  to={paths.category(product.category.name)}
                  className={styles['product-category']}
                >
                  {product.category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
      {categories.length > 0 && (
        <div className={styles.section}>
          <div className={styles.label}>Категории</div>
          <ul className={styles.list}>
            {categories.map((cat) => (
              <li key={cat.id} className={styles['category-item']}>
                <NavLink
                  to={paths.category(cat.name)}
                  className={styles['category-title']}
                >
                  <span>{cat.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!(Boolean(categories.length) || Boolean(products.length)) && (
        <div className={styles.empty}>Ничего не найдено 😥</div>
      )}
    </div>
  );
};
