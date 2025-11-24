import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getDetails, createDetails, DETAILS_ENDPOINT } from '../details';
import { mockDetails, mockDetailsArray } from '../__mocks__/details.mock';
import { ZodError } from 'zod';
import type { DetailsInput } from '../../schemas/details.schema';

describe('details service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getDetails', () => {
    it('should fetch details without pagination', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDetailsArray,
      });

      const result = await getDetails();

      expect(globalThis.fetch).toHaveBeenCalledWith(DETAILS_ENDPOINT);
      expect(result).toEqual(mockDetailsArray);
    });

    it('should add _page query param when provided', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDetailsArray,
      });

      const page = 2;
      const result = await getDetails(page);

      const expectedUrl = new URL(DETAILS_ENDPOINT);
      expectedUrl.searchParams.set('_page', page.toString());

      expect(globalThis.fetch).toHaveBeenCalledWith(expectedUrl.toString());
      expect(result).toEqual(mockDetailsArray);
    });

    it('should add _limit query param when provided', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDetailsArray,
      });

      const limit = 10;
      const result = await getDetails(undefined, limit);

      const expectedUrl = new URL(DETAILS_ENDPOINT);
      expectedUrl.searchParams.set('_limit', limit.toString());

      expect(globalThis.fetch).toHaveBeenCalledWith(expectedUrl.toString());
      expect(result).toEqual(mockDetailsArray);
    });

    it('should add both _page and _limit query params when provided', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDetailsArray,
      });

      const page = 2;
      const limit = 10;
      const result = await getDetails(page, limit);

      const expectedUrl = new URL(DETAILS_ENDPOINT);
      expectedUrl.searchParams.set('_page', page.toString());
      expectedUrl.searchParams.set('_limit', limit.toString());

      expect(globalThis.fetch).toHaveBeenCalledWith(expectedUrl.toString());
      expect(result).toEqual(mockDetailsArray);
    });

    it('should parse and validate response schema', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDetailsArray,
      });

      const result = await getDetails();

      expect(result).toEqual(mockDetailsArray);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('photo');
      expect(result[0]).toHaveProperty('employmentType');
      expect(result[0]).toHaveProperty('locationId');
    });

    it('should throw error when response schema is invalid', async () => {
      const invalidData = [{ id: 'invalid', photo: 123 }];

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidData,
      });

      await expect(getDetails()).rejects.toThrow(ZodError);
    });

    it('should handle fetch errors', async () => {
      const error = new Error('Network error');
      globalThis.fetch = vi.fn().mockRejectedValue(error);

      await expect(getDetails()).rejects.toThrow('Network error');
    });

    it('should handle empty response array', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [],
      });

      const result = await getDetails();

      expect(result).toEqual([]);
    });
  });

  describe('createDetails', () => {
    const validInput = {
      photo:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      employmentType: 'Full-time',
      locationId: 1,
      notes: 'Test notes',
      submissionId: 'sub-1234567890',
    };

    it('should create details with valid data', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDetails,
      });

      const result = await createDetails(validInput);

      expect(globalThis.fetch).toHaveBeenCalledWith(DETAILS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validInput),
      });
      expect(result).toEqual(mockDetails);
    });

    it('should validate input schema before sending request', async () => {
      const invalidInput: Partial<DetailsInput> & {
        photo: string;
      } = {
        photo: 'invalid-photo',
        employmentType: 'Full-time',
        locationId: 1,
      };

      await expect(createDetails(invalidInput as DetailsInput)).rejects.toThrow(
        ZodError,
      );
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('should include optional notes field', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDetails,
      });

      const inputWithNotes = {
        ...validInput,
        notes: 'Some notes',
      };

      await createDetails(inputWithNotes);

      expect(globalThis.fetch).toHaveBeenCalledWith(DETAILS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputWithNotes),
      });
    });

    it('should include submissionId when provided', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDetails,
      });

      const inputWithSubmissionId = {
        ...validInput,
        submissionId: 'sub-1234567890',
      };

      await createDetails(inputWithSubmissionId);

      expect(globalThis.fetch).toHaveBeenCalledWith(DETAILS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputWithSubmissionId),
      });
    });

    it('should allow notes to be omitted when not provided', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDetails,
      });

      const inputWithoutNotes = {
        photo: validInput.photo,
        employmentType: validInput.employmentType,
        locationId: validInput.locationId,
        submissionId: validInput.submissionId,
      };

      await createDetails(inputWithoutNotes);

      expect(globalThis.fetch).toHaveBeenCalledWith(DETAILS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputWithoutNotes),
      });
    });

    it('should parse and validate response schema', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDetails,
      });

      const result = await createDetails(validInput);

      expect(result).toEqual(mockDetails);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('photo');
      expect(result).toHaveProperty('employmentType');
      expect(result).toHaveProperty('locationId');
    });

    it('should throw error when response schema is invalid', async () => {
      const invalidResponse = { id: 'invalid', photo: 123 };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => invalidResponse,
      });

      await expect(createDetails(validInput)).rejects.toThrow(ZodError);
    });

    it('should handle fetch errors', async () => {
      const error = new Error('Network error');
      globalThis.fetch = vi.fn().mockRejectedValue(error);

      await expect(createDetails(validInput)).rejects.toThrow('Network error');
    });

    it('should handle non-ok responses', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({ error: 'Validation error' }),
      });

      await expect(createDetails(validInput)).rejects.toThrow();
    });

    it('should validate photo format (must start with data:image/)', async () => {
      const invalidPhotoInput: Partial<DetailsInput> & {
        photo: string;
      } = {
        ...validInput,
        photo: 'not-a-data-url',
      };

      await expect(
        createDetails(invalidPhotoInput as DetailsInput),
      ).rejects.toThrow(ZodError);
    });

    it('should validate employmentType enum', async () => {
      const invalidEmploymentTypeInput: Partial<DetailsInput> & {
        employmentType: string;
      } = {
        ...validInput,
        employmentType: 'InvalidType',
      };

      await expect(
        createDetails(invalidEmploymentTypeInput as DetailsInput),
      ).rejects.toThrow(ZodError);
    });

    it('should validate locationId is positive integer', async () => {
      const invalidLocationIdInput: Partial<DetailsInput> & {
        locationId: number;
      } = {
        ...validInput,
        locationId: -1,
      };

      await expect(
        createDetails(invalidLocationIdInput as DetailsInput),
      ).rejects.toThrow(ZodError);
    });
  });
});
