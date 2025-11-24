import { render } from '@testing-library/react';
import FieldBasicInfo from '../FieldBasicInfo';
import { vi } from 'vitest';

vi.mock('../../select-department', () => ({
  default: () => <div>SelectDepartment</div>,
}));

describe('FieldBasicInfo', () => {
  it('should render with these fields: employee id, full name, email, department, role', () => {
    const { getByText } = render(<FieldBasicInfo />);
    expect(getByText('Employee ID')).toBeInTheDocument();
    expect(getByText('Full Name')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('SelectDepartment')).toBeInTheDocument();
    expect(getByText('Role')).toBeInTheDocument();
  });
});
