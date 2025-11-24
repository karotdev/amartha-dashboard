import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import FieldBasicInfo from '../FieldBasicInfo';
import { vi } from 'vitest';
import type { BasicInfoInput } from '../../../schemas/basic-info.schema';

vi.mock('../../select-department', () => ({
  default: ({ ...props }: { label?: string }) => (
    <div>
      <label htmlFor="department">Department</label>
      <input id="department" placeholder="Enter department" {...props} />
    </div>
  ),
}));

const TestWrapper = ({ employeeId }: { employeeId?: string }) => {
  const { register, formState, watch } = useForm<BasicInfoInput>({
    defaultValues: {
      employeeId: '',
      fullName: '',
      email: '',
      departmentId: 0,
      role: '',
    },
  });

  return (
    <FieldBasicInfo
      register={register}
      errors={formState.errors}
      watch={watch}
      employeeId={employeeId}
    />
  );
};

describe('FieldBasicInfo', () => {
  it('should display all form fields that users can see and interact with', () => {
    render(<TestWrapper />);
    expect(screen.getByLabelText(/employee id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/department/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
  });

  it('should allow users to type in the full name field', async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const fullNameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    await user.type(fullNameInput, 'John Doe');

    expect(fullNameInput.value).toBe('John Doe');
  });

  it('should allow users to type in the email field', async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    await user.type(emailInput, 'john@example.com');

    expect(emailInput.value).toBe('john@example.com');
  });

  it('should display employee ID value that users can see', () => {
    render(<TestWrapper employeeId="ENG-001" />);

    const employeeIdInput = screen.getByLabelText(/employee id/i) as HTMLInputElement;
    expect(employeeIdInput.value).toBe('ENG-001');
  });
});
