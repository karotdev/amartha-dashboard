import { getLocations } from '../../../../services/locations';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { LocationsResponse } from '../../../../schemas/locations.schema';
import type { Option } from '../../../../types';

export const useGetLocations = (nameLike: string) => {
  const { data, isLoading, error } = useQuery<LocationsResponse>({
    queryKey: ['locations', nameLike],
    queryFn: () => getLocations(nameLike),
    enabled: nameLike.length > 2,
  });

  const memoizedData = useMemo<Option[]>(() => {
    if (!data) return [];

    return data.map((location) => ({
      label: location.name,
      value: location.id,
    }));
  }, [data]);

  return { data: memoizedData, isLoading, error };
};
