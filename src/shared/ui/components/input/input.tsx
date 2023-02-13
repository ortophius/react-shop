import clsx from 'clsx';
import { AllHTMLAttributes, HTMLInputTypeAttribute } from 'react';
import styles from './input.module.scss';

type InputProps = Omit<AllHTMLAttributes<HTMLInputElement>, 'type'> & {
  type?: 'text' | 'tel' | 'email' | 'number' | 'search';
};

export const Input = ({ className, type = 'text', ...props }: InputProps) => (
  <input {...props} type={type} className={clsx(styles.input, className)} />
);
