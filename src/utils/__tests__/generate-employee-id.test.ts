import { describe, it, expect } from 'vitest';
import { generateEmployeeId } from '../generate-employee-id';
import type { BasicInfoResponse } from '../../schemas/basic-info.schema';

describe('generateEmployeeId', () => {
  describe('Basic Generation', () => {
    it('should generate employee ID with department prefix', () => {
      const result = generateEmployeeId({
        departmentId: 1,
        departmentName: 'Engineering',
        existingEmployees: [],
      });

      expect(result).toMatch(/^ENG-\d{3}$/);
      expect(result).toBe('ENG-001');
    });

    it('should generate sequential IDs for same department', () => {
      const existingEmployees: BasicInfoResponse[] = [
        {
          id: 1,
          employeeId: 'ENG-001',
          fullName: 'John Doe',
          email: 'john@example.com',
          departmentId: 1,
          role: 'admin',
        },
      ];

      const result = generateEmployeeId({
        departmentId: 1,
        departmentName: 'Engineering',
        existingEmployees,
      });

      expect(result).toBe('ENG-002');
    });

    it('should handle multiple existing employees', () => {
      const existingEmployees: BasicInfoResponse[] = [
        {
          id: 1,
          employeeId: 'ENG-001',
          fullName: 'John Doe',
          email: 'john@example.com',
          departmentId: 1,
          role: 'admin',
        },
        {
          id: 2,
          employeeId: 'ENG-002',
          fullName: 'Jane Smith',
          email: 'jane@example.com',
          departmentId: 1,
          role: 'admin',
        },
      ];

      const result = generateEmployeeId({
        departmentId: 1,
        departmentName: 'Engineering',
        existingEmployees,
      });

      expect(result).toBe('ENG-003');
    });
  });

  describe('Department Prefixes', () => {
    it('should use first 3 uppercase letters of department name', () => {
      const testCases = [
        { name: 'Engineering', expected: 'ENG' },
        { name: 'Lending', expected: 'LEN' },
        { name: 'Operations', expected: 'OPE' },
        { name: 'Funding', expected: 'FUN' },
      ];

      testCases.forEach(({ name, expected }) => {
        const result = generateEmployeeId({
          departmentId: 1,
          departmentName: name,
          existingEmployees: [],
        });

        expect(result).toMatch(new RegExp(`^${expected}-\\d{3}$`));
      });
    });

    it('should pad short department names with X', () => {
      const result = generateEmployeeId({
        departmentId: 1,
        departmentName: 'IT',
        existingEmployees: [],
      });

      expect(result).toMatch(/^ITX-\d{3}$/);
    });

    it('should handle single character department names', () => {
      const result = generateEmployeeId({
        departmentId: 1,
        departmentName: 'A',
        existingEmployees: [],
      });

      expect(result).toMatch(/^AXX-\d{3}$/);
    });
  });

  describe('Department Filtering', () => {
    it('should only count employees from same department', () => {
      const existingEmployees: BasicInfoResponse[] = [
        {
          id: 1,
          employeeId: 'ENG-001',
          fullName: 'John Doe',
          email: 'john@example.com',
          departmentId: 1,
          role: 'admin',
        },
        {
          id: 2,
          employeeId: 'LEN-001',
          fullName: 'Jane Smith',
          email: 'jane@example.com',
          departmentId: 2,
          role: 'admin',
        },
        {
          id: 3,
          employeeId: 'ENG-002',
          fullName: 'Bob Johnson',
          email: 'bob@example.com',
          departmentId: 1,
          role: 'admin',
        },
      ];

      const result = generateEmployeeId({
        departmentId: 1,
        departmentName: 'Engineering',
        existingEmployees,
      });

      expect(result).toBe('ENG-003');
    });

    it('should generate first ID for new department', () => {
      const existingEmployees: BasicInfoResponse[] = [
        {
          id: 1,
          employeeId: 'ENG-001',
          fullName: 'John Doe',
          email: 'john@example.com',
          departmentId: 1,
          role: 'admin',
        },
      ];

      const result = generateEmployeeId({
        departmentId: 2,
        departmentName: 'Lending',
        existingEmployees,
      });

      expect(result).toBe('LEN-001');
    });
  });

  describe('ID Format Validation', () => {
    it('should generate IDs in correct format (XXX-XXX)', () => {
      const result = generateEmployeeId({
        departmentId: 1,
        departmentName: 'Engineering',
        existingEmployees: [],
      });

      expect(result).toMatch(/^[A-Z]{3}-\d{3}$/);
    });

    it('should pad numbers with leading zeros', () => {
      const result = generateEmployeeId({
        departmentId: 1,
        departmentName: 'Engineering',
        existingEmployees: [],
      });

      expect(result).toBe('ENG-001');
    });

    it('should handle large numbers correctly', () => {
      const existingEmployees: BasicInfoResponse[] = Array.from(
        { length: 99 },
        (_, i) => ({
          id: i + 1,
          employeeId: `ENG-${String(i + 1).padStart(3, '0')}`,
          fullName: `Employee ${i + 1}`,
          email: `employee${i + 1}@example.com`,
          departmentId: 1,
          role: 'admin',
        }),
      );

      const result = generateEmployeeId({
        departmentId: 1,
        departmentName: 'Engineering',
        existingEmployees,
      });

      expect(result).toBe('ENG-100');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty existing employees array', () => {
      const result = generateEmployeeId({
        departmentId: 1,
        departmentName: 'Engineering',
        existingEmployees: [],
      });

      expect(result).toBe('ENG-001');
    });

    it('should handle employees with non-matching IDs', () => {
      const existingEmployees: BasicInfoResponse[] = [
        {
          id: 1,
          employeeId: 'INVALID-ID',
          fullName: 'John Doe',
          email: 'john@example.com',
          departmentId: 1,
          role: 'admin',
        },
        {
          id: 2,
          employeeId: 'ENG-001',
          fullName: 'Jane Smith',
          email: 'jane@example.com',
          departmentId: 1,
          role: 'admin',
        },
      ];

      const result = generateEmployeeId({
        departmentId: 1,
        departmentName: 'Engineering',
        existingEmployees,
      });

      expect(result).toBe('ENG-002');
    });

    it('should handle gaps in sequence', () => {
      const existingEmployees: BasicInfoResponse[] = [
        {
          id: 1,
          employeeId: 'ENG-001',
          fullName: 'John Doe',
          email: 'john@example.com',
          departmentId: 1,
          role: 'admin',
        },
        {
          id: 2,
          employeeId: 'ENG-005',
          fullName: 'Jane Smith',
          email: 'jane@example.com',
          departmentId: 1,
          role: 'admin',
        },
      ];

      const result = generateEmployeeId({
        departmentId: 1,
        departmentName: 'Engineering',
        existingEmployees,
      });

      expect(result).toBe('ENG-006');
    });

    it('should handle case-insensitive department names', () => {
      const result1 = generateEmployeeId({
        departmentId: 1,
        departmentName: 'engineering',
        existingEmployees: [],
      });

      const result2 = generateEmployeeId({
        departmentId: 1,
        departmentName: 'ENGINEERING',
        existingEmployees: [],
      });

      expect(result1).toMatch(/^ENG-\d{3}$/);
      expect(result2).toMatch(/^ENG-\d{3}$/);
    });
  });
});
