import { Activity, useState, useRef, useEffect } from 'react';
import { useGetLocations } from './repo/use-get-locations';
import styles from './SelectLocation.module.css';
import Textfield from '../../../components/ui/Textfield';

interface SelectLocationProps {
  value?: string;
  onChange?: (value: string, id: number) => void;
  onBlur?: () => void;
  error?: string;
}

const SelectLocation = ({
  value: controlledValue,
  onChange,
  onBlur,
  error,
}: SelectLocationProps) => {
  const [nameLike, setNameLike] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { data, isLoading } = useGetLocations(nameLike);
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

  const handleSelect = (location: { label: string; value: number | string }) => {
    const locationId = Number(location.value);
    setSelectedValue(location.label);
    setNameLike(location.label);
    setIsSearching(false);
    if (onChange) {
      onChange(location.label, locationId);
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
    <div ref={selectRef} className={styles['select-location']}>
      <Textfield
        label="Location"
        id="location"
        placeholder="Enter location"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={() => setIsSearching(true)}
        onBlur={onBlur}
      />
      {error && <span style={{ color: 'red', fontSize: '0.875rem' }}>{error}</span>}
      <Activity mode={isSearching && nameLike.length > 0 ? 'visible' : 'hidden'}>
        <div className={styles['select-location__options']}>
          {data.map((location) => (
            <div
              key={location.value}
              className={styles['select-location__option']}
              onClick={() => handleSelect(location)}
            >
              {location.label}
            </div>
          ))}
        </div>
      </Activity>
      <Activity mode={isLoading ? 'visible' : 'hidden'}>
        <div className={styles['select-location__loading']}>Loading...</div>
      </Activity>
    </div>
  );
};

export default SelectLocation;
