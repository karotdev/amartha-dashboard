import { FormLayoutTitle } from '../wizard/presentations/FormLayout';
import { Link } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import styles from './Employees.module.css';

const EmployeesPage = () => {
  return (
    <PageLayout>
      <div className={styles['employees-page']}>
        <FormLayoutTitle
          title="Employees"
          description="Manage your employees"
        />
        <div className={styles['employees-page__content']}>
          <div className={styles['employees-page__content-header']}>
            <Link
              to="/wizard"
              className={styles['employees-page__content-header-button']}
            >
              <PlusIcon />
              Add Employee
            </Link>
          </div>
          <div className={styles['employees-page__table']}>
            <div className={styles['employees-page__table-header']}>
              <div />
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
