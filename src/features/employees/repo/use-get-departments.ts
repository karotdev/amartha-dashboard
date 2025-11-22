import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '../../../services/departments';
import type { DepartmentsResponse } from '../../../schemas/departments.schema';

export const useGetDepartments = () => {
  const { data, isLoading, error } = useQuery<DepartmentsResponse>({
    queryKey: ['departments'],
    queryFn: () => getDepartments(),
    enabled: true,
  });

  return { data, isLoading, error };
};
