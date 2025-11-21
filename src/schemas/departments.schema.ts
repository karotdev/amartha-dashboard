import { z } from 'zod';

export const departmentResponseSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
});

export const departmentsResponseSchema = z.array(departmentResponseSchema);

export type DepartmentResponse = z.infer<typeof departmentResponseSchema>;
export type DepartmentsResponse = z.infer<typeof departmentsResponseSchema>;
