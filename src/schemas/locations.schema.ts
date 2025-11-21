import { z } from 'zod';

export const locationResponseSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
});

export const locationsResponseSchema = z.array(locationResponseSchema);

export type LocationResponse = z.infer<typeof locationResponseSchema>;
export type LocationsResponse = z.infer<typeof locationsResponseSchema>;
