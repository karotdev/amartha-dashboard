import { useQuery } from '@tanstack/react-query';
import { getLocations } from '../../../services/locations';
import type { LocationsResponse } from '../../../schemas/locations.schema';

export const useGetLocations = () => {
  const { data, isLoading, error } = useQuery<LocationsResponse>({
    queryKey: ['locations'],
    queryFn: () => getLocations(),
    enabled: true,
  });

  return { data, isLoading, error };
};
