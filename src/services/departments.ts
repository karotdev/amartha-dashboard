import { departmentsResponseSchema } from '../schemas/departments.schema';
import type { DepartmentsResponse } from '../schemas/departments.schema';

const API_BASE_URL = 'http://localhost:4001';
export const DEPARTMENTS_ENDPOINT = `${API_BASE_URL}/departments`;

export const getDepartments = async (
  nameLike?: string,
): Promise<DepartmentsResponse> => {
  const url = new URL(DEPARTMENTS_ENDPOINT);
  if (nameLike) {
    url.searchParams.set('name_like', nameLike);
  }

  const response = await fetch(url.toString());
  const data = await response.json();
  return departmentsResponseSchema.parse(data);
};
