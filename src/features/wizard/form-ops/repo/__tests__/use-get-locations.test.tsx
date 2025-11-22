import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetLocations } from '../use-get-locations';
import * as locationsService from '../../../../../services/locations';
import { mockLocations } from '../../../../../services/__mocks__/locations.mock';

vi.mock('../../../../../services/locations', () => ({
  getLocations: vi.fn(),
}));

describe('useGetLocations', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('should return locations successfully', async () => {
    vi.mocked(locationsService.getLocations).mockResolvedValue(mockLocations);

    const { result } = renderHook(() => useGetLocations(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockLocations);
    expect(result.current.error).toBeNull();
    expect(locationsService.getLocations).toHaveBeenCalledTimes(1);
  });

  it('should filter locations by nameLike parameter', async () => {
    const filteredLocations = mockLocations.filter((loc) =>
      loc.name.toLowerCase().includes('jak'),
    );
    vi.mocked(locationsService.getLocations).mockResolvedValue(
      filteredLocations,
    );

    const { result } = renderHook(() => useGetLocations('jak'), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(filteredLocations);
    expect(locationsService.getLocations).toHaveBeenCalledWith('jak');
  });

  it('should handle errors', async () => {
    const error = new Error('Failed to fetch locations');
    vi.mocked(locationsService.getLocations).mockRejectedValue(error);

    const { result } = renderHook(() => useGetLocations(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeDefined();
  });
});

