import {
  detailsInputSchema,
  detailsResponseArraySchema,
  detailsResponseSchema,
} from '../schemas/details.schema';
import type {
  DetailsInput,
  DetailsResponse,
  DetailsResponseArray,
} from '../schemas/details.schema';

const API_BASE_URL = 'http://localhost:4002';
export const DETAILS_ENDPOINT = `${API_BASE_URL}/details`;

export const getDetails = async (
  page?: number,
  limit?: number,
): Promise<DetailsResponseArray> => {
  const url = new URL(DETAILS_ENDPOINT);
  if (page) {
    url.searchParams.set('_page', page.toString());
  }
  if (limit) {
    url.searchParams.set('_limit', limit.toString());
  }

  const response = await fetch(url.toString());
  const data = await response.json();
  return detailsResponseArraySchema.parse(data);
};

export const createDetails = async (
  data: DetailsInput,
): Promise<DetailsResponse> => {
  const validatedData = detailsInputSchema.parse(data);

  const response = await fetch(DETAILS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedData),
  });

  const responseData = await response.json();
  return detailsResponseSchema.parse(responseData);
};
