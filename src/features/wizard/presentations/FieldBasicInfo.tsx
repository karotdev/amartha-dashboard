import styles from './FieldBasicInfo.module.css';

const FieldBasicInfo = () => {
  return (
    <div className={styles['field-basic-info']}>
      <div>
        <label htmlFor="employee-id">Employee ID</label>
        <input type="text" id="employee-id" placeholder="Enter employee ID" />
      </div>
      <div>
        <label htmlFor="full-name">Full Name</label>
        <input type="text" id="full-name" placeholder="Enter full name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter email" />
      </div>
      <div>
        <label htmlFor="department">Department</label>
        <input type="text" id="department" placeholder="Enter department" />
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <input type="text" id="role" placeholder="Enter role" />
      </div>
    </div>
  );
};

export default FieldBasicInfo;
