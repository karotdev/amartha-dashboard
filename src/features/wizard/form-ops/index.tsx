import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStepper } from '../../../hooks/use-stepper';
import { WIZARD_STEPS_OPS } from '../../../constants';
import {
  FormLayout,
  FormLayoutActions,
  FormLayoutContent,
  FormLayoutHeader,
  FormLayoutTitle,
  FormLayoutSection,
} from '../presentations/FormLayout';
import Button from '../../../components/ui/Button';
import FieldDetail from '../presentations/FieldDetail';
import Stepper from '../../../components/ui/Stepper';
import type { DetailsInput } from '../../../schemas/details.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { detailsInputSchema } from '../../../schemas/details.schema';
import { useSubmitEmployeesDetails } from '../repo/use-submit-employees-details';

const FormOps = () => {
  const navigate = useNavigate();
  const { currentStep, completedSteps, handleStepClick } =
    useStepper(WIZARD_STEPS_OPS);

  const { submitEmployeesDetails, isPending: isSubmitting } =
    useSubmitEmployeesDetails();

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedLocationName, setSelectedLocationName] = useState<string>('');

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

  const handleEmploymentTypeChange = (employmentType: string) => {
    detailsForm.setValue('employmentType', employmentType);
  };

  const handleLocationChange = (locationName: string, locationId: number) => {
    detailsForm.setValue('locationId', locationId);
    setSelectedLocationName(locationName);
  };

  const generateSubmissionId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  };

  const handleSubmit = async () => {
    setSubmitError(null);

    const isValid = await detailsForm.trigger();
    if (!isValid) {
      return;
    }

    try {
      const submissionId = generateSubmissionId();
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

  return (
    <FormLayout>
      <FormLayoutHeader>
        <FormLayoutTitle
          title="Create Account"
          description="Create your account by completing the necessary steps"
        />
        <Stepper
          steps={WIZARD_STEPS_OPS}
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
    </FormLayout>
  );
};

export default FormOps;
