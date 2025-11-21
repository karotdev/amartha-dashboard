import { PlusIcon } from 'lucide-react';
import FormTitle from '../wizard/presentations/FormTitle';
import PageLayout from '../../components/layout/PageLayout';
import styles from './Employees.module.css';
import Button from '../../components/ui/Button';

const EmployeesPage = () => {
  return (
    <PageLayout>
      <div className={styles['employees-page']}>
        <FormTitle title="Employees" description="Manage your employees" />
        <div>
          <Button type="button">
            <PlusIcon />
            Add Employee
          </Button>
          <div className={styles['employees-page__table']}>
            <div className={styles['employees-page__table-header']}>
              <div>Photo</div>
              <div>Name</div>
              <div>Email</div>
              <div>Phone</div>
              <div>Role</div>
            </div>
            <div className={styles['employees-page__table-body']}>
              <div className={styles['employees-page__table-body-row']}>
                <div>Photo</div>
                <div>John Doe</div>
                <div>john.doe@example.com</div>
                <div>1234567890</div>
                <div>Admin</div>
              </div>
              <div className={styles['employees-page__table-body-row']}>
                <div>Photo</div>
                <div>Jane Doe</div>
                <div>jane.doe@example.com</div>
                <div>0987654321</div>
                <div>Operations</div>
              </div>
              <div className={styles['employees-page__table-body-row']}>
                <div>Photo</div>
                <div>Jim Beam</div>
                <div>jim.beam@example.com</div>
                <div>1111111111</div>
                <div>Admin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default EmployeesPage;
