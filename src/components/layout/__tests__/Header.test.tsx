import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';

describe('Header', () => {
  it('should have title and action button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(getByText('Amartha')).toBeInTheDocument();
    expect(getByText('Hi, Fajar!')).toBeInTheDocument();
  });

  it('should have correct href for title link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const titleLink = getByText('Amartha').closest('a');
    expect(titleLink).toHaveAttribute('href', '/');
  });

  it('should open menu when action button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    fireEvent.click(getByText('Hi, Fajar!'));
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it('should have correct href for logout link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    fireEvent.click(getByText('Hi, Fajar!'));
    const logoutLink = getByText('Logout').closest('a');
    expect(logoutLink).toHaveAttribute('href', '/logout');
  });
});
