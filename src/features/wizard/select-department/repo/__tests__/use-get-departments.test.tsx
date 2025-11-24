import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockDepartments } from '../../../../../services/__mocks__/departments.mock';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetDepartments } from '../use-get-departments';
import * as departmentsService from '../../../../../services/departments';

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

    const { result } = renderHook(() => useGetDepartments('test'), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual([
      { label: 'Lending', value: 1 },
      { label: 'Funding', value: 2 },
      { label: 'Operations', value: 3 },
      { label: 'Engineering', value: 4 },
    ]);
    expect(result.current.error).toBeNull();
    expect(departmentsService.getDepartments).toHaveBeenCalledWith('test');
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

    expect(result.current.data).toEqual([{ label: 'Engineering', value: 4 }]);
    expect(departmentsService.getDepartments).toHaveBeenCalledWith('eng');
  });

  it('should handle errors', async () => {
    const error = new Error('Failed to fetch departments');
    vi.mocked(departmentsService.getDepartments).mockRejectedValue(error);

    const { result } = renderHook(() => useGetDepartments('test'), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeDefined();
  });

  it('should not fetch when nameLike length <= 2', () => {
    const { result } = renderHook(() => useGetDepartments('ab'), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(departmentsService.getDepartments).not.toHaveBeenCalled();
  });

  it('should not fetch when nameLike is empty string', () => {
    const { result } = renderHook(() => useGetDepartments(''), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(departmentsService.getDepartments).not.toHaveBeenCalled();
  });
});
