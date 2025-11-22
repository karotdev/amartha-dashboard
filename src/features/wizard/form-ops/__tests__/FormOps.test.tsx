import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FormOps from '..';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('FormOps', () => {
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
          <FormOps />
        </QueryClientProvider>
      </MemoryRouter>,
    );
    expect(getByTestId('step-details')).toBeInTheDocument();
  });
});
