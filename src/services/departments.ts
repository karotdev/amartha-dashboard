import { departmentsResponseSchema } from '../schemas/departments.schema';
import type { DepartmentsResponse } from '../schemas/departments.schema';
import { API_STEP1_URL } from '../config/api';

export const DEPARTMENTS_ENDPOINT = `${API_STEP1_URL}/departments`;

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
