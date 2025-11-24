import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getDepartments, DEPARTMENTS_ENDPOINT } from '../departments';
import { mockDepartments } from '../__mocks__/departments.mock';
import { ZodError } from 'zod';

describe('departments service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getDepartments', () => {
    it('should fetch departments without filter', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDepartments,
      });

      const result = await getDepartments();

      expect(globalThis.fetch).toHaveBeenCalledWith(DEPARTMENTS_ENDPOINT);
      expect(result).toEqual(mockDepartments);
    });

    it('should add name_like query param when provided', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDepartments,
      });

      const nameLike = 'eng';
      const result = await getDepartments(nameLike);

      const expectedUrl = new URL(DEPARTMENTS_ENDPOINT);
      expectedUrl.searchParams.set('name_like', nameLike);

      expect(globalThis.fetch).toHaveBeenCalledWith(expectedUrl.toString());
      expect(result).toEqual(mockDepartments);
    });

    it('should parse and validate response schema', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDepartments,
      });

      const result = await getDepartments();

      expect(result).toEqual(mockDepartments);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
    });

    it('should throw error when response schema is invalid', async () => {
      const invalidData = [{ id: 'invalid', name: 123 }];

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidData,
      });

      await expect(getDepartments()).rejects.toThrow(ZodError);
    });

    it('should handle fetch errors', async () => {
      const error = new Error('Network error');
      globalThis.fetch = vi.fn().mockRejectedValue(error);

      await expect(getDepartments()).rejects.toThrow('Network error');
    });

    it('should handle non-ok responses', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ error: 'Server error' }),
      });

      await expect(getDepartments()).rejects.toThrow();
    });

    it('should handle empty response array', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [],
      });

      const result = await getDepartments();

      expect(result).toEqual([]);
    });

    it('should handle name_like with special characters', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDepartments,
      });

      const nameLike = 'test&value=123';
      await getDepartments(nameLike);

      const expectedUrl = new URL(DEPARTMENTS_ENDPOINT);
      expectedUrl.searchParams.set('name_like', nameLike);

      expect(globalThis.fetch).toHaveBeenCalledWith(expectedUrl.toString());
    });
  });
});
