import { cn } from '../../../utils/cn';
import Separator from '../../../components/ui/Separator';
import styles from './FormAdmin.module.css';

const FormAdmin = () => {
  return (
    <>
      <div className={styles['form-basic-container']}>
        <p className={styles['form-basic__title']}>Basic Information</p>
        <div className={styles['form-basic']}>
          <div className={styles['form-basic__field']}>
            <label htmlFor="employee-id">Employee ID</label>
            <input
              type="text"
              id="employee-id"
              placeholder="Enter employee ID"
            />
          </div>
          <div className={styles['form-basic__field']}>
            <label htmlFor="full-name">Full Name</label>
            <input type="text" id="full-name" placeholder="Enter full name" />
          </div>
          <div className={styles['form-basic__field']}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter email" />
          </div>
          <div className={styles['form-basic__field']}>
            <label htmlFor="department">Department</label>
            <input type="text" id="department" placeholder="Enter department" />
          </div>
          <div className={styles['form-basic__field']}>
            <label htmlFor="role">Role</label>
            <input type="text" id="role" placeholder="Enter role" />
          </div>
        </div>
      </div>
      <Separator />
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
    </>
  );
};

export default FormAdmin;
