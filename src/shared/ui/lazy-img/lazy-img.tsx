import { useIsInViewport } from '@/shared/lib/is-in-viewport';
import { AllHTMLAttributes, useRef, useState } from 'react';
import styles from './lazy-img.module.scss';

export const LazyImg = (props: AllHTMLAttributes<HTMLImageElement>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showImg, setShowImg] = useState(false);
  useIsInViewport(
    containerRef,
    () => {
      setShowImg(true);
    },
    { threshold: 0.2 }
  );

  return showImg ? (
    <img {...props} />
  ) : (
    <div ref={containerRef} className={styles.lazy} />
  );
};
