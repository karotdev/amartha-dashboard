import { locationsResponseSchema } from '../schemas/locations.schema';
import type { LocationsResponse } from '../schemas/locations.schema';

const API_BASE_URL = 'http://localhost:4002';
export const LOCATIONS_ENDPOINT = `${API_BASE_URL}/locations`;

export const getLocations = async (url: string): Promise<LocationsResponse> => {
  const response = await fetch(url);
  const data = await response.json();
  return locationsResponseSchema.parse(data);
};
