import { z } from 'zod';
import { EMPLOYMENT_TYPE_OPTIONS } from '../constants';

export const detailsInputSchema = z.object({
  photo: z
    .string()
    .min(1, 'Photo is required')
    .startsWith('data:image/', 'Photo must be a valid image file'),
  employmentType: z.enum(
    [...EMPLOYMENT_TYPE_OPTIONS] as [string, ...string[]],
    {
      message: 'Employment Type is required',
    },
  ),
  locationId: z
    .number({
      message: 'Office Location is required',
    })
    .int('Please select from available options')
    .positive('Please select from available options'),
  notes: z.string().optional(),
  submissionId: z.string(),
});

export const detailsResponseSchema = z.object({
  id: z.number().int().positive(),
  photo: z.string(),
  employmentType: z.enum([...EMPLOYMENT_TYPE_OPTIONS] as [string, ...string[]]),
  locationId: z.number().int().positive(),
  notes: z.string().optional(),
  submissionId: z.string(),
});

export const detailsResponseArraySchema = z.array(detailsResponseSchema);

export type DetailsInput = z.infer<typeof detailsInputSchema>;
export type DetailsResponse = z.infer<typeof detailsResponseSchema>;
export type DetailsResponseArray = z.infer<typeof detailsResponseArraySchema>;
