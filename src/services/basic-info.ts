import {
  basicInfoInputSchema,
  basicInfoResponseArraySchema,
  basicInfoResponseSchema,
} from '../schemas/basic-info.schema';
import type {
  BasicInfoInput,
  BasicInfoResponse,
  BasicInfoResponseArray,
} from '../schemas/basic-info.schema';

const API_BASE_URL = 'http://localhost:4001';
export const BASIC_INFO_ENDPOINT = `${API_BASE_URL}/basicInfo`;

export const getBasicInfo = async (
  url: string,
): Promise<BasicInfoResponseArray> => {
  const response = await fetch(url);
  const data = await response.json();
  return basicInfoResponseArraySchema.parse(data);
};

export const createBasicInfo = async (
  data: BasicInfoInput,
): Promise<BasicInfoResponse> => {
  const validatedData = basicInfoInputSchema.parse(data);

  const response = await fetch(BASIC_INFO_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedData),
  });

  const responseData = await response.json();
  return basicInfoResponseSchema.parse(responseData);
};
