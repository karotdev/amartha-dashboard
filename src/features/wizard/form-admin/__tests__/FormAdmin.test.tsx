import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FormAdmin from '../index';

describe('FormAdmin', () => {
  it('should render with these fields: employee id, full name, email, department, role', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FormAdmin />
      </MemoryRouter>,
    );
    expect(getByText('Employee ID')).toBeInTheDocument();
    expect(getByText('Full Name')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Department')).toBeInTheDocument();
    expect(getByText('Role')).toBeInTheDocument();
  });
});
