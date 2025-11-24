import { createBasicInfo } from '../../../services/basic-info';
import { useMutation } from '@tanstack/react-query';
import type {
  BasicInfoInput,
  BasicInfoResponse,
} from '../../../schemas/basic-info.schema';

export const useSubmitEmployeesBasicInfo = () => {
  const { mutateAsync, isPending, error } = useMutation<
    BasicInfoResponse,
    Error,
    BasicInfoInput
  >({
    mutationKey: ['submitEmployeesBasicInfo'],
    mutationFn: (data: BasicInfoInput) => createBasicInfo(data),
  });

  return { submitEmployeesBasicInfo: mutateAsync, isPending, error };
};
