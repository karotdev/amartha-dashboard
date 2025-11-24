import { useQuery } from '@tanstack/react-query';
import { getDetails } from '../../../services/details';
import type { DetailsResponseArray } from '../../../schemas/details.schema';

export const useGetEmployeesDetails = (page?: number, limit?: number) => {
  const { data, isLoading, error } = useQuery<DetailsResponseArray>({
    queryKey: ['details', page, limit],
    queryFn: () => getDetails(page, limit),
    enabled: true,
  });

  return { data, isLoading, error };
};
