import { Button } from '@/shared/ui/components/button';
import { useEvent } from 'effector-react';
import { PropsWithChildren, ReactNode } from 'react';
import styles from './filters-list.module.scss';
import { Filter, filtersSubmitted } from './model';

export const FiltersList = ({ children }: PropsWithChildren<{}>) => {
  const submitFilters = useEvent(filtersSubmitted);

  return (
    <div className={styles['filters-list']}>
      {children}
      <Button theme="dark" onClick={submitFilters}>
        Применить фильтры
      </Button>
    </div>
  );
};
