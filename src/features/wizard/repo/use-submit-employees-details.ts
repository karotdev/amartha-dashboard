import { createDetails } from '../../../services/details';
import { useMutation } from '@tanstack/react-query';
import type {
  DetailsInput,
  DetailsResponse,
} from '../../../schemas/details.schema';

export const useSubmitEmployeesDetails = () => {
  const { mutateAsync, isPending, error } = useMutation<
    DetailsResponse,
    Error,
    DetailsInput
  >({
    mutationKey: ['submitEmployeesDetails'],
    mutationFn: (data: DetailsInput) => createDetails(data),
  });

  return { submitEmployeesDetails: mutateAsync, isPending, error };
};
