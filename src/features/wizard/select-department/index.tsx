import { Activity, useState, useRef, useEffect } from 'react';
import { useGetDepartments } from './repo/use-get-departments';
import styles from './SelectDepartment.module.css';
import Textfield from '../../../components/ui/Textfield';

interface SelectDepartmentProps {
  value?: string;
  onChange?: (value: string, id: number) => void;
  onBlur?: () => void;
  error?: string;
}

const SelectDepartment = ({
  value: controlledValue,
  onChange,
  onBlur,
  error,
}: SelectDepartmentProps) => {
  const [nameLike, setNameLike] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { data, isLoading } = useGetDepartments(nameLike);
  const selectRef = useRef<HTMLDivElement>(null);

  const displayValue = controlledValue || selectedValue || nameLike;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setNameLike(inputValue);
    setSelectedValue('');
    setIsSearching(true);
    if (onChange) {
      onChange('', 0);
    }
  };

  const handleSelect = (department: {
    label: string;
    value: number | string;
  }) => {
    const departmentId = Number(department.value);
    setSelectedValue(department.label);
    setNameLike(department.label);
    setIsSearching(false);
    if (onChange) {
      onChange(department.label, departmentId);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSearching(false);
        if (selectedValue) {
          setNameLike(selectedValue);
        }
        if (onBlur) {
          onBlur();
        }
      }
    };

    if (isSearching) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearching, selectedValue, onBlur]);

  return (
    <div ref={selectRef} className={styles['select-department']}>
      <Textfield
        label="Department"
        id="department"
        placeholder="Enter department"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={() => setIsSearching(true)}
        onBlur={onBlur}
      />
      {error && (
        <span style={{ color: 'red', fontSize: '0.875rem' }}>{error}</span>
      )}
      <Activity
        mode={isSearching && nameLike.length > 0 ? 'visible' : 'hidden'}
      >
        <div className={styles['select-department__options']}>
          {data.map((department) => (
            <div
              key={department.value}
              className={styles['select-department__option']}
              onClick={() => handleSelect(department)}
            >
              {department.label}
            </div>
          ))}
        </div>
      </Activity>
      <Activity mode={isLoading ? 'visible' : 'hidden'}>
        <div className={styles['select-department__loading']}>Loading...</div>
      </Activity>
    </div>
  );
};

export default SelectDepartment;
