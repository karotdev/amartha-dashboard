import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveDraft, loadDraft, clearDraft } from '../use-local-storage';

describe('use-local-storage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('saveDraft', () => {
    it('should save data to localStorage', () => {
      const data = { name: 'John', age: 30 };
      saveDraft('test-key', data);

      const stored = localStorage.getItem('test-key');
      expect(stored).toBe(JSON.stringify(data));
    });

    it('should overwrite existing data', () => {
      const initialData = { name: 'John' };
      const updatedData = { name: 'Jane', age: 25 };

      saveDraft('test-key', initialData);
      saveDraft('test-key', updatedData);

      const stored = localStorage.getItem('test-key');
      expect(stored).toBe(JSON.stringify(updatedData));
    });

    it('should handle complex objects', () => {
      const complexData = {
        user: { name: 'John', email: 'john@example.com' },
        items: [1, 2, 3],
        metadata: { createdAt: '2024-01-01' },
      };

      saveDraft('test-key', complexData);

      const stored = localStorage.getItem('test-key');
      expect(JSON.parse(stored!)).toEqual(complexData);
    });

    it('should handle string values', () => {
      saveDraft('test-key', 'simple string');

      const stored = localStorage.getItem('test-key');
      expect(stored).toBe(JSON.stringify('simple string'));
    });

    it('should handle number values', () => {
      saveDraft('test-key', 42);

      const stored = localStorage.getItem('test-key');
      expect(stored).toBe(JSON.stringify(42));
    });

    it('should handle null values', () => {
      saveDraft('test-key', null);

      const stored = localStorage.getItem('test-key');
      expect(stored).toBe(JSON.stringify(null));
    });

    it('should not throw error on localStorage quota exceeded', () => {
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = vi.fn(() => {
        throw new DOMException('QuotaExceededError');
      });

      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        saveDraft('test-key', { data: 'test' });
      }).not.toThrow();

      consoleSpy.mockRestore();
      Storage.prototype.setItem = originalSetItem;
    });
  });

  describe('loadDraft', () => {
    it('should load data from localStorage', () => {
      const data = { name: 'John', age: 30 };
      localStorage.setItem('test-key', JSON.stringify(data));

      const loaded = loadDraft<typeof data>('test-key');

      expect(loaded).toEqual(data);
    });

    it('should return null if key does not exist', () => {
      const loaded = loadDraft('non-existent-key');

      expect(loaded).toBeNull();
    });

    it('should return null for empty string', () => {
      localStorage.setItem('test-key', '');

      const loaded = loadDraft('test-key');

      expect(loaded).toBeNull();
    });

    it('should handle complex objects', () => {
      const complexData = {
        user: { name: 'John', email: 'john@example.com' },
        items: [1, 2, 3],
      };

      localStorage.setItem('test-key', JSON.stringify(complexData));

      const loaded = loadDraft<typeof complexData>('test-key');

      expect(loaded).toEqual(complexData);
    });

    it('should handle string values', () => {
      localStorage.setItem('test-key', JSON.stringify('test string'));

      const loaded = loadDraft<string>('test-key');

      expect(loaded).toBe('test string');
    });

    it('should handle number values', () => {
      localStorage.setItem('test-key', JSON.stringify(42));

      const loaded = loadDraft<number>('test-key');

      expect(loaded).toBe(42);
    });

    it('should return null on invalid JSON', () => {
      localStorage.setItem('test-key', 'invalid json{');

      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const loaded = loadDraft('test-key');

      expect(loaded).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should handle type casting correctly', () => {
      interface User {
        name: string;
        age: number;
      }

      const user: User = { name: 'John', age: 30 };
      localStorage.setItem('test-key', JSON.stringify(user));

      const loaded = loadDraft<User>('test-key');

      expect(loaded).toEqual(user);
      expect(loaded?.name).toBe('John');
      expect(loaded?.age).toBe(30);
    });
  });

  describe('clearDraft', () => {
    it('should remove data from localStorage', () => {
      localStorage.setItem('test-key', JSON.stringify({ data: 'test' }));

      clearDraft('test-key');

      expect(localStorage.getItem('test-key')).toBeNull();
    });

    it('should not throw error if key does not exist', () => {
      expect(() => {
        clearDraft('non-existent-key');
      }).not.toThrow();
    });

    it('should handle multiple keys', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      localStorage.setItem('key3', 'value3');

      clearDraft('key1');
      clearDraft('key2');

      expect(localStorage.getItem('key1')).toBeNull();
      expect(localStorage.getItem('key2')).toBeNull();
      expect(localStorage.getItem('key3')).toBe('value3');
    });
  });

  describe('Integration', () => {
    it('should save and load draft correctly', () => {
      const formData = {
        employeeId: 'ENG-001',
        fullName: 'John Doe',
        email: 'john@example.com',
        departmentId: 1,
        role: 'admin',
      };

      saveDraft('admin_basicInfo', formData);
      const loaded = loadDraft<typeof formData>('admin_basicInfo');

      expect(loaded).toEqual(formData);
    });

    it('should handle draft workflow', () => {
      const initialData = { name: 'John' };
      saveDraft('draft', initialData);

      const updatedData = { name: 'Jane', age: 25 };
      saveDraft('draft', updatedData);

      const loaded = loadDraft<typeof updatedData>('draft');
      expect(loaded).toEqual(updatedData);

      clearDraft('draft');
      expect(loadDraft('draft')).toBeNull();
    });

    it('should handle separate drafts for different forms', () => {
      const basicInfo = { employeeId: 'ENG-001', fullName: 'John' };
      const details = { photo: 'data:image/...', employmentType: 'full-time' };

      saveDraft('admin_basicInfo', basicInfo);
      saveDraft('admin_details', details);

      expect(loadDraft('admin_basicInfo')).toEqual(basicInfo);
      expect(loadDraft('admin_details')).toEqual(details);

      clearDraft('admin_basicInfo');

      expect(loadDraft('admin_basicInfo')).toBeNull();
      expect(loadDraft('admin_details')).toEqual(details);
    });
  });
});
