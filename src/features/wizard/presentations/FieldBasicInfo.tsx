import styles from './FieldBasicInfo.module.css';
import Textfield from '../../../components/ui/Textfield';
import SelectDepartment from '../select-department';

const FieldBasicInfo = () => {
  return (
    <div className={styles['field-basic-info']}>
      <Textfield
        label="Full Name"
        id="full-name"
        placeholder="Enter full name"
      />
      <Textfield label="Email" id="email" placeholder="Enter email" />
      <SelectDepartment />
      <Textfield
        label="Employee ID"
        id="employee-id"
        placeholder="Enter employee ID"
      />
      <Textfield label="Role" id="role" placeholder="Enter role" />
    </div>
  );
};

export default FieldBasicInfo;
