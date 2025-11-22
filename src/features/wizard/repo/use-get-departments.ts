import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '../../../services/departments';
import type { DepartmentsResponse } from '../../../schemas/departments.schema';

export const useGetDepartments = (nameLike?: string) => {
  const { data, isLoading, error } = useQuery<DepartmentsResponse>({
    queryKey: ['departments', nameLike],
    queryFn: () => getDepartments(nameLike),
    enabled: true,
  });

  return { data, isLoading, error };
};
