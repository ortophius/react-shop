import { AllHTMLAttributes, RefObject, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './dimmer.module.scss';

type DimmerProps = AllHTMLAttributes<HTMLDivElement> & {
  el: RefObject<HTMLElement>;
};

export const Dimmer = ({ el, ...props }: DimmerProps) => {
  const [zindex, setZindex] = useState('');

  const updateZIndex = () => {
    if (!el.current) return;
    setZindex(el.current.style.zIndex);
    el.current.style.zIndex = '110';
  };

  const resetZIndex = () => {
    if (!el.current) return;
    el.current.style.zIndex = zindex;
  };

  useEffect(() => {
    updateZIndex();
    return resetZIndex;
  }, []);

  return createPortal(
    <div {...props} className={styles.dimmer}></div>,
    document.body
  );
};
