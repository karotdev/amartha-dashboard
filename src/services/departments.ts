import { departmentsResponseSchema } from '../schemas/departments.schema';
import type { DepartmentsResponse } from '../schemas/departments.schema';

const API_BASE_URL = 'http://localhost:4001';
export const DEPARTMENTS_ENDPOINT = `${API_BASE_URL}/departments`;

export const getDepartments = async (
  url: string,
): Promise<DepartmentsResponse> => {
  const response = await fetch(url);
  const data = await response.json();
  return departmentsResponseSchema.parse(data);
};
