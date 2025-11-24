import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('should show menu items when user clicks the action button', async () => {
    const user = userEvent.setup();
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    await user.click(getByText('Hi, Fajar!'));
    expect(getByText('Profile')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it('should have correct href for logout link that user can click', async () => {
    const user = userEvent.setup();
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    await user.click(getByText('Hi, Fajar!'));
    const logoutLink = getByText('Logout').closest('a');
    expect(logoutLink).toHaveAttribute('href', '/logout');
  });

  it('should hide menu from view when user clicks outside', async () => {
    const user = userEvent.setup();
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    await user.click(getByText('Hi, Fajar!'));
    expect(getByText('Profile')).toBeVisible();
    expect(getByText('Logout')).toBeVisible();

    await user.click(document.body);

    expect(screen.getByText('Profile')).not.toBeVisible();
    expect(screen.getByText('Logout')).not.toBeVisible();
  });

  it('should keep menu visible when user clicks inside the menu', async () => {
    const user = userEvent.setup();
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    await user.click(getByText('Hi, Fajar!'));
    const logoutLink = getByText('Logout');
    expect(logoutLink).toBeInTheDocument();

    await user.click(logoutLink);
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it('should toggle menu visibility when user clicks button multiple times', async () => {
    const user = userEvent.setup();
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const button = getByText('Hi, Fajar!');

    await user.click(button);
    expect(getByText('Profile')).toBeVisible();
    expect(getByText('Logout')).toBeVisible();

    await user.click(button);
    expect(screen.getByText('Profile')).not.toBeVisible();
    expect(screen.getByText('Logout')).not.toBeVisible();

    await user.click(button);
    expect(getByText('Profile')).toBeVisible();
    expect(getByText('Logout')).toBeVisible();
  });
});
