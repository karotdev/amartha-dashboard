import { EMPLOYMENT_TYPE_OPTIONS } from '../../../constants';
import Select from '../../../components/ui/Select';
import SelectLocation from '../select-location';
import styles from './FieldDetail.module.css';
import Textfield from '../../../components/ui/Textfield';

const FieldDetail = () => {
  return (
    <div className={styles['field-detail']}>
      <Textfield
        className={styles['field-detail__photo']}
        label="Photo"
        id="photo"
        placeholder="Enter photo"
      />
      <Select
        label="Employment Type"
        options={EMPLOYMENT_TYPE_OPTIONS}
        placeholder="Enter employment type"
      />
      <SelectLocation />
      <Textfield
        className={styles['field-detail__notes']}
        label="Notes"
        id="notes"
        placeholder="Enter notes"
      />
    </div>
  );
};

export default FieldDetail;
