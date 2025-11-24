import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockLocations } from '../../../../../services/__mocks__/locations.mock';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetLocations } from '../../../select-location/repo/use-get-locations';
import * as locationsService from '../../../../../services/locations';

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

    const { result } = renderHook(() => useGetLocations('test'), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual([
      { label: 'Jakarta', value: 1 },
      { label: 'Depok', value: 2 },
      { label: 'Surabaya', value: 3 },
    ]);
    expect(result.current.error).toBeNull();
    expect(locationsService.getLocations).toHaveBeenCalledWith('test');
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

    expect(result.current.data).toEqual([{ label: 'Jakarta', value: 1 }]);
    expect(locationsService.getLocations).toHaveBeenCalledWith('jak');
  });

  it('should handle errors', async () => {
    const error = new Error('Failed to fetch locations');
    vi.mocked(locationsService.getLocations).mockRejectedValue(error);

    const { result } = renderHook(() => useGetLocations('test'), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeDefined();
  });

  it('should not fetch when nameLike length <= 2', () => {
    const { result } = renderHook(() => useGetLocations('ab'), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(locationsService.getLocations).not.toHaveBeenCalled();
  });

  it('should not fetch when nameLike is empty string', () => {
    const { result } = renderHook(() => useGetLocations(''), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(locationsService.getLocations).not.toHaveBeenCalled();
  });
});
