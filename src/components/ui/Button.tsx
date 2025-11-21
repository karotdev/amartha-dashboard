import { cn } from '../../utils/cn';
import styles from './Button.module.css';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

const Button = ({
  className,
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button className={cn(styles['button'], className ?? '')} {...props}>
      {children}
    </button>
  );
};

export default Button;
