import { ROLE_FORM_OPTIONS } from '../../../constants';
import Select from '../../../components/ui/Select';
import SelectDepartment from '../select-department';
import styles from './FieldBasicInfo.module.css';
import Textfield from '../../../components/ui/Textfield';

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
        readOnly
        label="Employee ID"
        id="employee-id"
        placeholder="Enter employee ID"
      />
      <Select
        label="Role"
        options={ROLE_FORM_OPTIONS}
        placeholder="Enter role"
      />
    </div>
  );
};

export default FieldBasicInfo;
