import { ROLE_FORM_OPTIONS } from '../../../constants';
import Select from '../../../components/ui/Select';
import SelectDepartment from '../select-department';
import styles from './FieldBasicInfo.module.css';
import Textfield from '../../../components/ui/Textfield';
import type { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import type { BasicInfoInput } from '../../../schemas/basic-info.schema';

interface FieldBasicInfoProps {
  register: UseFormRegister<BasicInfoInput>;
  errors: FieldErrors<BasicInfoInput>;
  watch: UseFormWatch<BasicInfoInput>;
  employeeId?: string;
  onDepartmentChange?: (value: string, id: number) => void;
  onRoleChange?: (value: string) => void;
}

const FieldBasicInfo = ({
  register,
  errors,
  watch,
  employeeId = '',
  onDepartmentChange,
  onRoleChange,
}: FieldBasicInfoProps) => {
  return (
    <div className={styles['field-basic-info']}>
      <Textfield
        label="Full Name"
        id="full-name"
        placeholder="Enter full name"
        {...register('fullName')}
      />
      {errors.fullName && (
        <span style={{ color: 'red', fontSize: '0.875rem' }}>
          {errors.fullName.message}
        </span>
      )}
      <Textfield
        label="Email"
        id="email"
        placeholder="Enter email"
        {...register('email')}
      />
      {errors.email && (
        <span style={{ color: 'red', fontSize: '0.875rem' }}>
          {errors.email.message}
        </span>
      )}
      <SelectDepartment
        onChange={onDepartmentChange}
        onBlur={() => register('departmentId').onBlur({ target: null })}
        error={errors.departmentId?.message}
      />
      <Textfield
        readOnly
        label="Employee ID"
        id="employee-id"
        placeholder="Enter employee ID"
        value={employeeId}
        {...register('employeeId')}
      />
      {errors.employeeId && (
        <span style={{ color: 'red', fontSize: '0.875rem' }}>
          {errors.employeeId.message}
        </span>
      )}
      <Select
        label="Role"
        id="role"
        options={ROLE_FORM_OPTIONS}
        placeholder="Enter role"
        value={watch('role')}
        onChange={onRoleChange}
        onBlur={() => register('role').onBlur({ target: { name: 'role' } })}
        error={errors.role?.message}
      />
    </div>
  );
};

export default FieldBasicInfo;
