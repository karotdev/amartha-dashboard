import { Activity, useState, useRef, useEffect } from 'react';
import { useGetDepartments } from './repo/use-get-departments';
import styles from './SelectDepartment.module.css';
import Textfield from '../../../components/ui/Textfield';

const SelectDepartment = () => {
  const [nameLike, setNameLike] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { data, isLoading } = useGetDepartments(nameLike);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameLike(value);
    setSelectedValue('');
    setIsSearching(true);
  };

  const handleSelect = (department: {
    label: string;
    value: number | string;
  }) => {
    setSelectedValue(department.label);
    setNameLike(department.label);
    setIsSearching(false);
  };

  const displayValue = selectedValue || nameLike;

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
      }
    };

    if (isSearching) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearching, selectedValue]);

  return (
    <div ref={selectRef} className={styles['select-department']}>
      <Textfield
        label="Department"
        id="department"
        placeholder="Enter department"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={() => setIsSearching(true)}
      />
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
