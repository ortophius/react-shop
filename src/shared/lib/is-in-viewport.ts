import { RefObject, useEffect, useMemo, useState } from 'react';

export const useIsInViewport = <T extends Element>(
  ref: RefObject<T>,
  callback?: () => void,
  options?: Omit<IntersectionObserverInit, 'root'>
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (callback && entry.isIntersecting) callback();
        setIsIntersecting(entry.isIntersecting);
      }, options),
    []
  );

  useEffect(() => {
    if (!ref.current) return;
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return { isIntersecting };
};
