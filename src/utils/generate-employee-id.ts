import type { BasicInfoResponse } from '../schemas/basic-info.schema';

interface GenerateEmployeeIdParams {
  departmentId: number;
  departmentName: string;
  existingEmployees: BasicInfoResponse[];
}

export const generateEmployeeId = ({
  departmentId,
  departmentName,
  existingEmployees,
}: GenerateEmployeeIdParams): string => {
  const prefix = departmentName.toUpperCase().slice(0, 3).padEnd(3, 'X');

  const departmentEmployees = existingEmployees.filter(
    (emp) => emp.departmentId === departmentId,
  );

  const maxNumber = departmentEmployees.reduce((max, emp) => {
    const match = emp.employeeId.match(/^([A-Z]{3})-(\d{3})$/);
    if (match && match[1] === prefix) {
      const num = parseInt(match[2], 10);
      return Math.max(max, num);
    }
    return max;
  }, 0);

  const nextNumber = maxNumber + 1;
  const paddedNumber = nextNumber.toString().padStart(3, '0');

  return `${prefix}-${paddedNumber}`;
};
