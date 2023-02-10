import { useEvent } from 'effector-react';
import { DependencyList, useEffect } from 'react';
import { filterAdded, FilterPayload, filterRemoved } from '../model';

export const useFiltersList = (payload: FilterPayload, deps: DependencyList) => {
  const { addFilter, removeFilter } = useEvent({
    addFilter: filterAdded,
    removeFilter: filterRemoved,
  });

  useEffect(() => {
    addFilter(payload);
    return () => {
      removeFilter(payload.name);
    };
  }, deps);
};
