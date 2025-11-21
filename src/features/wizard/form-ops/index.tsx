import { cn } from '../../../utils/cn';
import styles from './FormOps.module.css';

const FormOps = () => {
  return (
    <div className={styles['form-detail-container']}>
      <p className={styles['form-detail__title']}>Details</p>
      <div className={styles['form-detail']}>
        <div
          className={cn(
            styles['form-detail__field'],
            styles['form-detail__field-full-width'],
          )}
        >
          <label htmlFor="photo">Photo</label>
          <input type="file" id="photo" />
        </div>
        <div className={styles['form-detail__field']}>
          <label htmlFor="employment-type">Employment Type</label>
          <input type="text" id="employment-type" />
        </div>
        <div className={styles['form-detail__field']}>
          <label htmlFor="office-location">Office Location</label>
          <input type="text" id="office-location" />
        </div>
        <div
          className={cn(
            styles['form-detail__field'],
            styles['form-detail__field-full-width'],
          )}
        >
          <label htmlFor="notes">Notes</label>
          <textarea id="notes" />
        </div>
      </div>
    </div>
  );
};

export default FormOps;
