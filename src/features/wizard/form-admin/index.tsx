import { Activity } from 'react';
import Stepper from '../../../components/ui/Stepper';
import { useStepper } from '../../../hooks/use-stepper';
import FormTitle from '../presentations/FormTitle';
import styles from './FormAdmin.module.css';
import FieldBasicInfo from '../presentations/FieldBasicInfo';
import FormSection from '../presentations/FormSection';
import FieldDetail from '../presentations/FieldDetail';

const FormAdmin = () => {
  const steps = [
    {
      id: 'basic-information',
      label: 'Basic Information',
      dataTestId: 'step-basic-information',
    },
    { id: 'details', label: 'Details', dataTestId: 'step-details' },
  ];

  const { currentStep, completedSteps, handleStepClick, handleStepComplete } =
    useStepper(steps);

  return (
    <div className={styles['form-admin']}>
      <div className={styles['form-admin__header']}>
        <FormTitle
          title="Create Account"
          description="Create your account by completing the necessary steps"
        />
        <Stepper
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={handleStepClick}
        />
      </div>
      <Activity mode={currentStep === 0 ? 'visible' : 'hidden'}>
        <FormSection title="Basic Information">
          <div className={styles['form-admin__content']}>
            <FieldBasicInfo />
            <div className={styles['form-admin__content-actions']}>
              <button type="button" onClick={handleStepComplete}>
                Next
              </button>
            </div>
          </div>
        </FormSection>
      </Activity>
      <Activity mode={currentStep === 1 ? 'visible' : 'hidden'}>
        <FormSection title="Details">
          <div className={styles['form-admin__content']}>
            <FieldDetail />
            <div className={styles['form-admin__content-actions']}>
              <button type="button" onClick={handleStepComplete}>
                Submit
              </button>
            </div>
          </div>
        </FormSection>
      </Activity>
    </div>
  );
};

export default FormAdmin;
