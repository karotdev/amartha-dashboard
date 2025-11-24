import { z } from 'zod';
import { ROLE_FORM_OPTIONS } from '../constants';

export const basicInfoInputSchema = z.object({
  employeeId: z
    .string()
    .min(1, 'Employee ID is required')
    .regex(
      /^[A-Z]{3}-\d{3}$/,
      'Employee ID must be in format XXX-XXX (e.g., ENG-003)',
    ),
  fullName: z.string().min(1, 'Full Name is required').trim(),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please use valid email e.g. john.doe@example.com')
    .trim(),
  departmentId: z
    .number({
      message: 'Department is required',
    })
    .int('Please select from available options')
    .positive('Please select from available options'),
  role: z.enum([...ROLE_FORM_OPTIONS] as [string, ...string[]], {
    message: 'Role is required',
  }),
  submissionId: z.string(),
});

export const basicInfoResponseSchema = z.object({
  id: z.number().int().positive(),
  employeeId: z.string(),
  fullName: z.string(),
  email: z.string(),
  departmentId: z.number().int().positive(),
  role: z.enum([...ROLE_FORM_OPTIONS] as [string, ...string[]]),
  submissionId: z.string(),
});

export const basicInfoResponseArraySchema = z.array(basicInfoResponseSchema);

export type BasicInfoInput = z.infer<typeof basicInfoInputSchema>;
export type BasicInfoResponse = z.infer<typeof basicInfoResponseSchema>;
export type BasicInfoResponseArray = z.infer<
  typeof basicInfoResponseArraySchema
>;
