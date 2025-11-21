import Stepper from '../../../components/ui/Stepper';
import { useStepper } from '../../../hooks/use-stepper';
import FieldDetail from '../presentations/FieldDetail';
import FormSection from '../presentations/FormSection';
import FormTitle from '../presentations/FormTitle';
import styles from './FormOps.module.css';

const FormOps = () => {
  const steps = [
    {
      id: 'details',
      label: 'Details',
      dataTestId: 'step-details',
    },
  ];

  const { currentStep, completedSteps, handleStepClick, handleStepComplete } =
    useStepper(steps);

  return (
    <div className={styles['form-ops']}>
      <div className={styles['form-ops__header']}>
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
      <FormSection title="Details">
        <div className={styles['form-ops__content']}>
          <FieldDetail />
          <div className={styles['form-ops__content-actions']}>
            <button type="button" onClick={handleStepComplete}>
              Submit
            </button>
          </div>
        </div>
      </FormSection>
    </div>
  );
};

export default FormOps;
