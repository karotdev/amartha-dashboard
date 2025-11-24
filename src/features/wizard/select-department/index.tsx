import { Activity, useState } from 'react';
import { useGetDepartments } from './repo/use-get-departments';
import styles from './SelectDepartment.module.css';
import Textfield from '../../../components/ui/Textfield';

const SelectDepartment = () => {
  const [nameLike, setNameLike] = useState('');
  const { data, isLoading } = useGetDepartments(nameLike);

  return (
    <div className={styles['select-department']}>
      <Textfield
        label="Department"
        id="department"
        placeholder="Enter department"
        value={nameLike}
        onChange={(e) => setNameLike(e.target.value)}
      />
      <Activity mode={nameLike.length > 0 ? 'visible' : 'hidden'}>
        <div className={styles['select-department__options']}>
          {data.map((department) => (
            <div
              key={department.value}
              className={styles['select-department__option']}
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
