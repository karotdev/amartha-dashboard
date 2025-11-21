import PageLayout from '../../components/layout/PageLayout';
import FormTitle from '../wizard/presentations/FormTitle';
import styles from './Employees.module.css';

const EmployeesPage = () => {
  return (
    <PageLayout>
      <div className={styles['employees-page']}>
        <FormTitle title="Employees" description="Manage your employees" />
        <div>Table</div>
      </div>
    </PageLayout>
  );
};

export default EmployeesPage;
