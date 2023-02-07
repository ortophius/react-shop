import clsx from 'clsx';
import { AllHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';

type ButtonProps = AllHTMLAttributes<HTMLButtonElement> & {
  children: string | ReactNode | ReactNode[];
  type?: 'button' | 'submit' | 'reset';
  theme?: 'light' | 'dark';
};

export const Button = ({
  children,
  type = 'button',
  className,
  theme = 'dark',
  ...props
}: ButtonProps) => (
  <button
    className={clsx(
      styles.button,
      {
        [styles.light]: theme === 'light',
      },
      className
    )}
    {...props}
    type={type}
  >
    {children}
  </button>
);
