import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import PageLayout from '../PageLayout';

describe('PageLayout', () => {
  it('should render sidebar and content', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <PageLayout />
      </MemoryRouter>,
    );
    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByTestId('sidebar')).toBeInTheDocument();
    expect(getByTestId('content')).toBeInTheDocument();
  });
});
