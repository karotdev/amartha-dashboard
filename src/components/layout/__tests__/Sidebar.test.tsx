import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Sidebar from '../Sidebar';

describe('Sidebar', () => {
  it('should have back button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );
    expect(getByText('Amartha')).toBeInTheDocument();
  });

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

  it('should have profile and logout button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );
    expect(getByText('Hi, Fajar!')).toBeInTheDocument();
    expect(getByText('Profile')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it('should have correct href for profile link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );
    const profileLink = getByText('Profile').closest('a');
    expect(profileLink).toHaveAttribute('href', '/profile');
  });

  it('should have correct href for logout link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );
    const logoutLink = getByText('Logout').closest('a');
    expect(logoutLink).toHaveAttribute('href', '/logout');
  });
});
