import { render } from '@testing-library/react';
import FieldBasicInfo from '../FieldBasicInfo';

describe('FieldBasicInfo', () => {
  it('should render with these fields: employee id, full name, email, department, role', () => {
    const { getByText } = render(<FieldBasicInfo />);
    expect(getByText('Employee ID')).toBeInTheDocument();
    expect(getByText('Full Name')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Department')).toBeInTheDocument();
    expect(getByText('Role')).toBeInTheDocument();
  });
});
