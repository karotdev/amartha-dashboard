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
  url: string,
): Promise<DetailsResponseArray> => {
  const response = await fetch(url);
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
