import Textfield from '../../../components/ui/Textfield';
import styles from './FieldBasicInfo.module.css';

const FieldBasicInfo = () => {
  return (
    <div className={styles['field-basic-info']}>
      <Textfield
        label="Employee ID"
        id="employee-id"
        placeholder="Enter employee ID"
      />
      <Textfield
        label="Full Name"
        id="full-name"
        placeholder="Enter full name"
      />
      <Textfield label="Email" id="email" placeholder="Enter email" />
      <Textfield
        label="Department"
        id="department"
        placeholder="Enter department"
      />
      <Textfield label="Role" id="role" placeholder="Enter role" />
    </div>
  );
};

export default FieldBasicInfo;
