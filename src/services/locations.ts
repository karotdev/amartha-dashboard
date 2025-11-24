import { locationsResponseSchema } from '../schemas/locations.schema';
import type { LocationsResponse } from '../schemas/locations.schema';

const API_BASE_URL = 'http://localhost:4002';
export const LOCATIONS_ENDPOINT = `${API_BASE_URL}/locations`;

export const getLocations = async (
  nameLike?: string,
): Promise<LocationsResponse> => {
  const url = new URL(LOCATIONS_ENDPOINT);
  if (nameLike) {
    url.searchParams.set('name_like', nameLike);
  }

  const response = await fetch(url.toString());
  const data = await response.json();
  return locationsResponseSchema.parse(data);
};
