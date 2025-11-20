import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';

describe('Sidebar', () => {
  it('should have navigation links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );
    expect(getByText('Overview')).toBeInTheDocument();
    expect(getByText('Transactions')).toBeInTheDocument();
    expect(getByText('Employees')).toBeInTheDocument();
    expect(getByText('Settings')).toBeInTheDocument();
  });

  it('should have correct href for employees link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );
    const employeesLink = getByText('Employees').closest('a');
    expect(employeesLink).toHaveAttribute('href', '/employees');
  });
});
