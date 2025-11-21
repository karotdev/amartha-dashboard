import styles from './RoleOption.module.css';
import { cn } from '../../../utils/cn';

interface RoleOptionProps {
  checked: boolean;
  id: string;
  label: string;
  description: string;
  dataTestId?: string;
  onChange: () => void;
}

const RoleOption = ({
  checked,
  id,
  label,
  description,
  dataTestId,
  onChange,
}: RoleOptionProps) => {
  return (
    <label
      htmlFor={id}
      data-testid={dataTestId}
      className={cn(
        styles['role-option'],
        checked ? styles['role-option--checked'] : '',
      )}
    >
      <input id={id} type="radio" checked={checked} onChange={onChange} />
      <span>{label}</span>
      <span>{description}</span>
    </label>
  );
};

export default RoleOption;
