import { useQuery } from '@tanstack/react-query';
import { getLocations } from '../../../../services/locations';
import type { LocationsResponse } from '../../../../schemas/locations.schema';

export const useGetLocations = (nameLike?: string) => {
  const { data, isLoading, error } = useQuery<LocationsResponse>({
    queryKey: ['locations', nameLike],
    queryFn: () => getLocations(nameLike),
    enabled: true,
  });

  return { data, isLoading, error };
};
