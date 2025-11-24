import { Activity, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStepper } from '../../../hooks/use-stepper';
import { WIZARD_STEPS_ADMIN } from '../../../constants';
import {
  FormLayout,
  FormLayoutActions,
  FormLayoutContent,
  FormLayoutHeader,
  FormLayoutTitle,
  FormLayoutSection,
} from '../presentations/FormLayout';
import Button from '../../../components/ui/Button';
import FieldBasicInfo from '../presentations/FieldBasicInfo';
import FieldDetail from '../presentations/FieldDetail';
import Stepper from '../../../components/ui/Stepper';
import { useForm } from 'react-hook-form';
import type { BasicInfoInput } from '../../../schemas/basic-info.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { basicInfoInputSchema } from '../../../schemas/basic-info.schema';
import type { DetailsInput } from '../../../schemas/details.schema';
import { detailsInputSchema } from '../../../schemas/details.schema';
import { useGetEmployeesBasicInfo } from '../../employees/repo/use-get-employees-basic-info';
import { generateEmployeeId } from '../../../utils/generate-employee-id';
import { useSubmitEmployeesBasicInfo } from '../repo/use-submit-employees-basic-info';
import { useSubmitEmployeesDetails } from '../repo/use-submit-employees-details';

const FormAdmin = () => {
  const navigate = useNavigate();
  const { currentStep, completedSteps, handleStepClick, handleStepComplete } =
    useStepper(WIZARD_STEPS_ADMIN);

  const { data: existingEmployees = [] } = useGetEmployeesBasicInfo();
  const { submitEmployeesBasicInfo, isPending: isSubmittingBasicInfo } =
    useSubmitEmployeesBasicInfo();
  const { submitEmployeesDetails, isPending: isSubmittingDetails } =
    useSubmitEmployeesDetails();

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedLocationName, setSelectedLocationName] = useState<string>('');

  const basicForm = useForm<BasicInfoInput>({
    resolver: zodResolver(basicInfoInputSchema),
    defaultValues: {
      employeeId: '',
      fullName: '',
      email: '',
      departmentId: 0,
      role: '',
      submissionId: '',
    },
  });

  const detailsForm = useForm<DetailsInput>({
    resolver: zodResolver(detailsInputSchema),
    defaultValues: {
      photo: '',
      employmentType: '',
      locationId: 0,
      notes: '',
      submissionId: '',
    },
  });

  const handleDepartmentChange = (
    departmentName: string,
    departmentId: number,
  ) => {
    basicForm.setValue('departmentId', departmentId);

    const generatedEmployeeId = generateEmployeeId({
      departmentId,
      departmentName,
      existingEmployees,
    });

    basicForm.setValue('employeeId', generatedEmployeeId);
  };

  const handleRoleChange = (role: string) => {
    basicForm.setValue('role', role);
  };

  const handleEmploymentTypeChange = (employmentType: string) => {
    detailsForm.setValue('employmentType', employmentType);
  };

  const handleLocationChange = (locationName: string, locationId: number) => {
    detailsForm.setValue('locationId', locationId);
    setSelectedLocationName(locationName);
  };

  const handleNext = async () => {
    const isValid = await basicForm.trigger();
    if (isValid) {
      handleStepComplete();
    }
  };

  const generateSubmissionId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  };

  const handleSubmit = async () => {
    setSubmitError(null);

    const isBasicInfoValid = await basicForm.trigger();
    const isDetailsValid = await detailsForm.trigger();

    if (!isBasicInfoValid || !isDetailsValid) {
      return;
    }

    try {
      const submissionId = generateSubmissionId();

      const basicInfoData = {
        ...basicForm.getValues(),
        submissionId,
      };
      await submitEmployeesBasicInfo(basicInfoData);

      const detailsData = {
        ...detailsForm.getValues(),
        submissionId,
      };
      await submitEmployeesDetails(detailsData);

      navigate('/employees');
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to submit employee data. Please try again.',
      );
    }
  };

  const isSubmitting = isSubmittingBasicInfo || isSubmittingDetails;

  return (
    <FormLayout>
      <FormLayoutHeader>
        <FormLayoutTitle
          title="Create Account"
          description="Create your account by completing the necessary steps"
        />
        <Stepper
          steps={WIZARD_STEPS_ADMIN}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={handleStepClick}
        />
      </FormLayoutHeader>
      {submitError && (
        <div style={{ color: 'red', padding: '1rem', margin: '1rem 0' }}>
          {submitError}
        </div>
      )}
      <Activity mode={currentStep === 0 ? 'visible' : 'hidden'}>
        <FormLayoutSection title="Basic Information">
          <FormLayoutContent>
            <FieldBasicInfo
              register={basicForm.register}
              errors={basicForm.formState.errors}
              watch={basicForm.watch}
              employeeId={basicForm.watch('employeeId')}
              onDepartmentChange={handleDepartmentChange}
              onRoleChange={handleRoleChange}
            />
            <FormLayoutActions>
              <Button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
              >
                Next
              </Button>
            </FormLayoutActions>
          </FormLayoutContent>
        </FormLayoutSection>
      </Activity>
      <Activity mode={currentStep === 1 ? 'visible' : 'hidden'}>
        <FormLayoutSection title="Details">
          <FormLayoutContent>
            <FieldDetail
              register={detailsForm.register}
              errors={detailsForm.formState.errors}
              watch={detailsForm.watch}
              setValue={detailsForm.setValue}
              onEmploymentTypeChange={handleEmploymentTypeChange}
              onLocationChange={handleLocationChange}
              locationValue={selectedLocationName}
            />
            <FormLayoutActions>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </FormLayoutActions>
          </FormLayoutContent>
        </FormLayoutSection>
      </Activity>
    </FormLayout>
  );
};

export default FormAdmin;
