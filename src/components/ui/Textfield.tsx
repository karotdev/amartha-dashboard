import { cn } from '../../utils/cn';
import styles from './Textfield.module.css';
import type { InputHTMLAttributes } from 'react';

interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Textfield = ({
  className,
  label,
  id,
  placeholder,
  ...props
}: TextfieldProps) => {
  return (
    <div className={cn(styles['textfield'], className ?? '')}>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} placeholder={placeholder} {...props} />
    </div>
  );
};

export default Textfield;
