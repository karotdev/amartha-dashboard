import { Activity, useState, useRef, useEffect } from 'react';
import styles from './Select.module.css';
import Textfield from './Textfield';
import type { Option } from '../../types';

interface SelectProps {
  error?: string;
  id?: string;
  label?: string;
  options?: Option[] | string[];
  placeholder?: string;
  value?: string;
  onBlur?: () => void;
  onChange?: (value: string) => void;
}

const Select = ({
  error,
  id,
  label = '',
  options = [],
  placeholder = '',
  value: controlledValue,
  onBlur,
  onChange,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleSelect = (selectedValue: string, displayText: string) => {
    if (!isControlled) {
      setInternalValue(displayText);
    }
    onChange?.(selectedValue);
    setIsOpen(false);
  };

  const handleTextfieldClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={selectRef} className={styles['select']}>
      <div onClick={handleTextfieldClick}>
        <Textfield
          className={styles['select__textfield']}
          readOnly
          label={label}
          id={id}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
        />
      </div>
      {error && (
        <span style={{ color: 'red', fontSize: '0.875rem' }}>{error}</span>
      )}
      <Activity mode={isOpen ? 'visible' : 'hidden'}>
        <div className={styles['select__options']}>
          {options.map((option: Option | string) => {
            const optionValue =
              typeof option === 'string' ? option : option.value;
            const optionLabel =
              typeof option === 'string' ? option : option.label;

            return (
              <div
                key={optionValue}
                className={styles['select__option']}
                onClick={() => handleSelect(String(optionValue), optionLabel)}
              >
                {optionLabel}
              </div>
            );
          })}
        </div>
      </Activity>
    </div>
  );
};

export default Select;
