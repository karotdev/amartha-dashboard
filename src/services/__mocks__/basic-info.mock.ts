import type { BasicInfoResponse } from '../../schemas/basic-info.schema';

export const mockBasicInfo: BasicInfoResponse = {
  id: 1,
  employeeId: 'ENG-001',
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  departmentId: 4,
  role: 'Engineer',
  submissionId: 'sub-1234567890',
};

export const mockBasicInfoArray: BasicInfoResponse[] = [
  mockBasicInfo,
  {
    id: 2,
    employeeId: 'OPS-001',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    departmentId: 3,
    role: 'Ops',
    submissionId: 'sub-1234567891',
  },
];

