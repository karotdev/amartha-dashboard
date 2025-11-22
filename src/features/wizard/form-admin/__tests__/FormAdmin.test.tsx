import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FormAdmin from '..';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('FormAdmin', () => {
  it('should have steps', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const { getByTestId } = render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <FormAdmin />
        </QueryClientProvider>
      </MemoryRouter>,
    );
    expect(getByTestId('step-basic-information')).toBeInTheDocument();
    expect(getByTestId('step-details')).toBeInTheDocument();
  });
});
