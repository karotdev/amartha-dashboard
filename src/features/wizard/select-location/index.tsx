import { Activity, useState, useRef, useEffect } from 'react';
import { useGetLocations } from './repo/use-get-locations';
import styles from './SelectLocation.module.css';
import Textfield from '../../../components/ui/Textfield';

const SelectLocation = () => {
  const [nameLike, setNameLike] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { data, isLoading } = useGetLocations(nameLike);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameLike(value);
    setSelectedValue('');
    setIsSearching(true);
  };

  const handleSelect = (location: { label: string; value: number | string }) => {
    setSelectedValue(location.label);
    setNameLike(location.label);
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
    <div ref={selectRef} className={styles['select-location']}>
      <Textfield
        label="Location"
        id="location"
        placeholder="Enter location"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={() => setIsSearching(true)}
      />
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
