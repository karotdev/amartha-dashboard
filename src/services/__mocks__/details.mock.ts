import type { DetailsResponse } from '../../schemas/details.schema';

export const mockDetails: DetailsResponse = {
  id: 1,
  photo:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  employmentType: 'Full-time',
  locationId: 1,
  notes: 'Test notes',
  submissionId: 'sub-1234567890',
};

export const mockDetailsArray: DetailsResponse[] = [
  mockDetails,
  {
    id: 2,
    photo:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    employmentType: 'Part-time',
    locationId: 2,
    notes: 'Another test',
    submissionId: 'sub-1234567891',
  },
];
