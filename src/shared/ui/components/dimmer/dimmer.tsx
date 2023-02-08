import { AllHTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import styles from './dimmer.module.scss';

export const Dimmer = (props: AllHTMLAttributes<HTMLDivElement>) =>
  createPortal(<div {...props} className={styles.dimmer}></div>, document.body);
