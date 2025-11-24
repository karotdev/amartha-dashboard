import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getLocations, LOCATIONS_ENDPOINT } from '../locations';
import { mockLocations } from '../__mocks__/locations.mock';
import { ZodError } from 'zod';

describe('locations service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getLocations', () => {
    it('should fetch locations without filter', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockLocations,
      });

      const result = await getLocations();

      expect(globalThis.fetch).toHaveBeenCalledWith(LOCATIONS_ENDPOINT);
      expect(result).toEqual(mockLocations);
    });

    it('should add name_like query param when provided', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockLocations,
      });

      const nameLike = 'jakarta';
      const result = await getLocations(nameLike);

      const expectedUrl = new URL(LOCATIONS_ENDPOINT);
      expectedUrl.searchParams.set('name_like', nameLike);

      expect(globalThis.fetch).toHaveBeenCalledWith(expectedUrl.toString());
      expect(result).toEqual(mockLocations);
    });

    it('should parse and validate response schema', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockLocations,
      });

      const result = await getLocations();

      expect(result).toEqual(mockLocations);
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

      await expect(getLocations()).rejects.toThrow(ZodError);
    });

    it('should handle fetch errors', async () => {
      const error = new Error('Network error');
      globalThis.fetch = vi.fn().mockRejectedValue(error);

      await expect(getLocations()).rejects.toThrow('Network error');
    });

    it('should handle non-ok responses', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ error: 'Server error' }),
      });

      await expect(getLocations()).rejects.toThrow();
    });

    it('should handle empty response array', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [],
      });

      const result = await getLocations();

      expect(result).toEqual([]);
    });

    it('should handle name_like with special characters', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockLocations,
      });

      const nameLike = 'test&value=123';
      await getLocations(nameLike);

      const expectedUrl = new URL(LOCATIONS_ENDPOINT);
      expectedUrl.searchParams.set('name_like', nameLike);

      expect(globalThis.fetch).toHaveBeenCalledWith(expectedUrl.toString());
    });
  });
});
