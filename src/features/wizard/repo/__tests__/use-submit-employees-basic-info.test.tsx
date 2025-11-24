import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockBasicInfo } from '../../../../services/__mocks__/basic-info.mock';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useSubmitEmployeesBasicInfo } from '../use-submit-employees-basic-info';
import * as basicInfoService from '../../../../services/basic-info';
import type { BasicInfoInput } from '../../../../schemas/basic-info.schema';

vi.mock('../../../../services/basic-info', () => ({
  createBasicInfo: vi.fn(),
}));

describe('useSubmitEmployeesBasicInfo', () => {
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

  it('should submit basic info successfully', async () => {
    const inputData: BasicInfoInput = {
      employeeId: 'ENG-001',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      departmentId: 4,
      role: 'Engineer',
      submissionId: 'sub-1234567890',
    };

    vi.mocked(basicInfoService.createBasicInfo).mockResolvedValue(
      mockBasicInfo,
    );

    const { result } = renderHook(() => useSubmitEmployeesBasicInfo(), {
      wrapper,
    });

    expect(result.current.isPending).toBe(false);

    const submitPromise = result.current.submitEmployeesBasicInfo(inputData);
    const response = await submitPromise;

    expect(response).toEqual(mockBasicInfo);
    expect(basicInfoService.createBasicInfo).toHaveBeenCalledWith(inputData);
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle submission errors', async () => {
    const inputData: BasicInfoInput = {
      employeeId: 'ENG-001',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      departmentId: 4,
      role: 'Engineer',
      submissionId: 'sub-1234567890',
    };

    const error = new Error('Failed to submit basic info');
    vi.mocked(basicInfoService.createBasicInfo).mockRejectedValue(error);

    const { result } = renderHook(() => useSubmitEmployeesBasicInfo(), {
      wrapper,
    });

    try {
      await result.current.submitEmployeesBasicInfo(inputData);
    } catch (e) {
      expect(e).toEqual(error);
    }

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(result.current.error).toBeDefined();
  });
});
