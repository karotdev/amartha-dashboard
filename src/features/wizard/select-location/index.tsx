import { Activity, useState } from 'react';
import { useGetLocations } from './repo/use-get-locations';
import styles from './SelectLocation.module.css';
import Textfield from '../../../components/ui/Textfield';

const SelectLocation = () => {
  const [nameLike, setNameLike] = useState('');
  const { data, isLoading } = useGetLocations(nameLike);

  return (
    <div className={styles['select-location']}>
      <Textfield
        label="Location"
        id="location"
        placeholder="Enter location"
        value={nameLike}
        onChange={(e) => setNameLike(e.target.value)}
      />
      <Activity mode={nameLike.length > 0 ? 'visible' : 'hidden'}>
        <div className={styles['select-location__options']}>
          {data.map((location) => (
            <div
              key={location.value}
              className={styles['select-location__option']}
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
