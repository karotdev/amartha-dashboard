import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getBasicInfo,
  createBasicInfo,
  BASIC_INFO_ENDPOINT,
} from '../basic-info';
import {
  mockBasicInfo,
  mockBasicInfoArray,
} from '../__mocks__/basic-info.mock';
import { ZodError } from 'zod';
import type { BasicInfoInput } from '../../schemas/basic-info.schema';

describe('basic-info service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getBasicInfo', () => {
    it('should fetch basic info without pagination', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockBasicInfoArray,
      });

      const result = await getBasicInfo();

      expect(globalThis.fetch).toHaveBeenCalledWith(BASIC_INFO_ENDPOINT);
      expect(result).toEqual(mockBasicInfoArray);
    });

    it('should add _page query param when provided', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockBasicInfoArray,
      });

      const page = 2;
      const result = await getBasicInfo(page);

      const expectedUrl = new URL(BASIC_INFO_ENDPOINT);
      expectedUrl.searchParams.set('_page', page.toString());

      expect(globalThis.fetch).toHaveBeenCalledWith(expectedUrl.toString());
      expect(result).toEqual(mockBasicInfoArray);
    });

    it('should add _limit query param when provided', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockBasicInfoArray,
      });

      const limit = 10;
      const result = await getBasicInfo(undefined, limit);

      const expectedUrl = new URL(BASIC_INFO_ENDPOINT);
      expectedUrl.searchParams.set('_limit', limit.toString());

      expect(globalThis.fetch).toHaveBeenCalledWith(expectedUrl.toString());
      expect(result).toEqual(mockBasicInfoArray);
    });

    it('should add both _page and _limit query params when provided', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockBasicInfoArray,
      });

      const page = 2;
      const limit = 10;
      const result = await getBasicInfo(page, limit);

      const expectedUrl = new URL(BASIC_INFO_ENDPOINT);
      expectedUrl.searchParams.set('_page', page.toString());
      expectedUrl.searchParams.set('_limit', limit.toString());

      expect(globalThis.fetch).toHaveBeenCalledWith(expectedUrl.toString());
      expect(result).toEqual(mockBasicInfoArray);
    });

    it('should parse and validate response schema', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockBasicInfoArray,
      });

      const result = await getBasicInfo();

      expect(result).toEqual(mockBasicInfoArray);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('employeeId');
      expect(result[0]).toHaveProperty('fullName');
      expect(result[0]).toHaveProperty('email');
    });

    it('should throw error when response schema is invalid', async () => {
      const invalidData = [{ id: 'invalid', employeeId: 123 }];

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidData,
      });

      await expect(getBasicInfo()).rejects.toThrow(ZodError);
    });

    it('should handle fetch errors', async () => {
      const error = new Error('Network error');
      globalThis.fetch = vi.fn().mockRejectedValue(error);

      await expect(getBasicInfo()).rejects.toThrow('Network error');
    });

    it('should handle empty response array', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [],
      });

      const result = await getBasicInfo();

      expect(result).toEqual([]);
    });
  });

  describe('createBasicInfo', () => {
    const validInput = {
      employeeId: 'ENG-001',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      departmentId: 4,
      role: 'Engineer',
      submissionId: 'sub-1234567890',
    };

    it('should create basic info with valid data', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockBasicInfo,
      });

      const result = await createBasicInfo(validInput);

      expect(globalThis.fetch).toHaveBeenCalledWith(BASIC_INFO_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validInput),
      });
      expect(result).toEqual(mockBasicInfo);
    });

    it('should validate input schema before sending request', async () => {
      const invalidInput: Partial<BasicInfoInput> & {
        employeeId: string;
      } = {
        employeeId: 'invalid-id',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        departmentId: 4,
        role: 'Engineer',
      };

      await expect(
        createBasicInfo(invalidInput as BasicInfoInput),
      ).rejects.toThrow(ZodError);
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('should include submissionId when provided', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockBasicInfo,
      });

      const inputWithSubmissionId = {
        ...validInput,
        submissionId: 'sub-1234567890',
      };

      await createBasicInfo(inputWithSubmissionId);

      expect(globalThis.fetch).toHaveBeenCalledWith(BASIC_INFO_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputWithSubmissionId),
      });
    });

    it('should parse and validate response schema', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockBasicInfo,
      });

      const result = await createBasicInfo(validInput);

      expect(result).toEqual(mockBasicInfo);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('employeeId');
      expect(result).toHaveProperty('fullName');
    });

    it('should throw error when response schema is invalid', async () => {
      const invalidResponse = { id: 'invalid', employeeId: 123 };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidResponse,
      });

      await expect(createBasicInfo(validInput)).rejects.toThrow(ZodError);
    });

    it('should handle fetch errors', async () => {
      const error = new Error('Network error');
      globalThis.fetch = vi.fn().mockRejectedValue(error);

      await expect(createBasicInfo(validInput)).rejects.toThrow(
        'Network error',
      );
    });

    it('should handle non-ok responses', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({ error: 'Validation error' }),
      });

      await expect(createBasicInfo(validInput)).rejects.toThrow();
    });

    it('should validate email format', async () => {
      const invalidEmailInput: Partial<BasicInfoInput> & {
        email: string;
      } = {
        ...validInput,
        email: 'invalid-email',
      };

      await expect(
        createBasicInfo(invalidEmailInput as BasicInfoInput),
      ).rejects.toThrow(ZodError);
    });

    it('should validate employeeId format', async () => {
      const invalidEmployeeIdInput: Partial<BasicInfoInput> & {
        employeeId: string;
      } = {
        ...validInput,
        employeeId: 'INVALID',
      };

      await expect(
        createBasicInfo(invalidEmployeeIdInput as BasicInfoInput),
      ).rejects.toThrow(ZodError);
    });
  });
});
