import { getDepartments } from '../../../../services/departments';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { DepartmentsResponse } from '../../../../schemas/departments.schema';
import type { Option } from '../../../../types';

export const useGetDepartments = (nameLike?: string) => {
  const { data, isLoading, error } = useQuery<DepartmentsResponse>({
    queryKey: ['departments', nameLike],
    queryFn: () => getDepartments(nameLike),
    enabled: true,
  });

  const memoizedData = useMemo<Option[]>(() => {
    if (!data) return [];

    return data.map((dept) => ({
      label: dept.name,
      value: dept.id,
    }));
  }, [data]);

  return { data: memoizedData, isLoading, error };
};
