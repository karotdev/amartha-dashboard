import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetDepartments } from '../use-get-departments';
import * as departmentsService from '../../../../../services/departments';
import { mockDepartments } from '../../../../../services/__mocks__/departments.mock';

vi.mock('../../../../../services/departments', () => ({
  getDepartments: vi.fn(),
}));

describe('useGetDepartments', () => {
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

  it('should return departments successfully', async () => {
    vi.mocked(departmentsService.getDepartments).mockResolvedValue(
      mockDepartments,
    );

    const { result } = renderHook(() => useGetDepartments(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockDepartments);
    expect(result.current.error).toBeNull();
    expect(departmentsService.getDepartments).toHaveBeenCalledTimes(1);
  });

  it('should filter departments by nameLike parameter', async () => {
    const filteredDepartments = mockDepartments.filter((dept) =>
      dept.name.toLowerCase().includes('eng'),
    );
    vi.mocked(departmentsService.getDepartments).mockResolvedValue(
      filteredDepartments,
    );

    const { result } = renderHook(() => useGetDepartments('eng'), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(filteredDepartments);
    expect(departmentsService.getDepartments).toHaveBeenCalledWith('eng');
  });

  it('should handle errors', async () => {
    const error = new Error('Failed to fetch departments');
    vi.mocked(departmentsService.getDepartments).mockRejectedValue(error);

    const { result } = renderHook(() => useGetDepartments(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeDefined();
  });
});
