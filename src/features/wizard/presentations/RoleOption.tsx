import { cn } from '../../../utils/cn';
import styles from './RoleOption.module.css';

interface RoleOptionProps {
  checked: boolean;
  dataTestId?: string;
  description: string;
  id: string;
  label: string;
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
      <span className={styles['role-option__label']}>{label}</span>
      <span>{description}</span>
    </label>
  );
};

export default RoleOption;
