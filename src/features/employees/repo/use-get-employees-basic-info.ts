import { useQuery } from '@tanstack/react-query';
import { getBasicInfo } from '../../../services/basic-info';
import type { BasicInfoResponseArray } from '../../../schemas/basic-info.schema';

export const useGetEmployeesBasicInfo = (page?: number, limit?: number) => {
  const { data, isLoading, error } = useQuery<BasicInfoResponseArray>({
    queryKey: ['basicInfo', page, limit],
    queryFn: () => getBasicInfo(page, limit),
    enabled: true,
  });

  return { data, isLoading, error };
};
