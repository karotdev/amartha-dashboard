import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSubmitEmployeesDetails } from '../use-submit-employees-details';
import * as detailsService from '../../../../services/details';
import { mockDetails } from '../../../../services/__mocks__/details.mock';
import type { DetailsInput } from '../../../../schemas/details.schema';

vi.mock('../../../../services/details', () => ({
  createDetails: vi.fn(),
}));

describe('useSubmitEmployeesDetails', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('should submit details successfully', async () => {
    const inputData: DetailsInput = {
      photo:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      employmentType: 'Full-time',
      locationId: 1,
      notes: 'Test notes',
    };

    vi.mocked(detailsService.createDetails).mockResolvedValue(mockDetails);

    const { result } = renderHook(() => useSubmitEmployeesDetails(), {
      wrapper,
    });

    expect(result.current.isPending).toBe(false);

    const submitPromise = result.current.submitEmployeesDetails(inputData);
    const response = await submitPromise;

    expect(response).toEqual(mockDetails);
    expect(detailsService.createDetails).toHaveBeenCalledWith(inputData);
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle submission errors', async () => {
    const inputData: DetailsInput = {
      photo:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      employmentType: 'Full-time',
      locationId: 1,
      notes: 'Test notes',
    };

    const error = new Error('Failed to submit details');
    vi.mocked(detailsService.createDetails).mockRejectedValue(error);

    const { result } = renderHook(() => useSubmitEmployeesDetails(), {
      wrapper,
    });

    try {
      await result.current.submitEmployeesDetails(inputData);
    } catch (e) {
      expect(e).toEqual(error);
    }

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(result.current.error).toBeDefined();
  });
});
