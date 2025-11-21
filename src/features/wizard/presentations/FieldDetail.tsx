import Textfield from '../../../components/ui/Textfield';
import styles from './FieldDetail.module.css';

const FieldDetail = () => {
  return (
    <div className={styles['field-detail']}>
      <Textfield
        className={styles['field-detail__photo']}
        label="Photo"
        id="photo"
        placeholder="Enter photo"
      />
      <Textfield
        label="Employment Type"
        id="employment-type"
        placeholder="Enter employment type"
      />
      <Textfield
        label="Office Location"
        id="office-location"
        placeholder="Enter office location"
      />
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
