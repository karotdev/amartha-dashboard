import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('should have title and action button', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Amartha')).toBeInTheDocument();
    expect(getByText('Hi, Fajar!')).toBeInTheDocument();
  });

  it('should redirect to home page when title is clicked', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    fireEvent.click(getByText('Amartha'));
    expect(window.location.pathname).toBe('/');
  });

  it('should open menu when action button is clicked', () => {
    const { getByText } = render(<Header />);
    fireEvent.click(getByText('Hi, Fajar!'));
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it('should redirect to logout page when logout link is clicked', () => {
    const { getByText } = render(<Header />);
    fireEvent.click(getByText('Hi, Fajar!'));
    fireEvent.click(getByText('Logout'));
    expect(window.location.pathname).toBe('/');
  });
});
