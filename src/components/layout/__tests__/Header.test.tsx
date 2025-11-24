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

  it('should close menu when clicking outside', () => {
    const { getByText, container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    fireEvent.click(getByText('Hi, Fajar!'));
    const menu = container.querySelector('[class*="header-action__menu"]');
    expect(menu).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    const style = window.getComputedStyle(menu as HTMLElement);
    expect(style.display).toBe('none');
  });

  it('should not close menu when clicking inside the menu', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    fireEvent.click(getByText('Hi, Fajar!'));
    const logoutLink = getByText('Logout');
    expect(logoutLink).toBeInTheDocument();

    fireEvent.mouseDown(logoutLink);
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it('should not close menu when clicking the button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const button = getByText('Hi, Fajar!');
    fireEvent.click(button);
    expect(getByText('Logout')).toBeInTheDocument();

    fireEvent.mouseDown(button);
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it('should toggle menu when button is clicked multiple times', () => {
    const { getByText, container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const button = getByText('Hi, Fajar!');
    const menu = container.querySelector('[class*="header-action__menu"]');

    fireEvent.click(button);
    let style = window.getComputedStyle(menu as HTMLElement);
    expect(style.display).not.toBe('none');

    fireEvent.click(button);
    style = window.getComputedStyle(menu as HTMLElement);
    expect(style.display).toBe('none');

    fireEvent.click(button);
    style = window.getComputedStyle(menu as HTMLElement);
    expect(style.display).not.toBe('none');
  });
});
