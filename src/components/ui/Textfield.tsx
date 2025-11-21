import styles from './Textfield.module.css';
import { cn } from '../../utils/cn';

interface TextfieldProps {
  className?: string;
  label: string;
  id: string;
  placeholder: string;
}

const Textfield = ({ className, label, id, placeholder }: TextfieldProps) => {
  return (
    <div className={cn(styles['textfield'], className ?? '')}>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} placeholder={placeholder} />
    </div>
  );
};

export default Textfield;
