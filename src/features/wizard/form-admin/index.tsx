import { Activity } from 'react';
import Stepper from '../../../components/ui/Stepper';
import { useStepper } from '../../../hooks/use-stepper';
import FormTitle from '../presentations/FormTitle';
import styles from './FormAdmin.module.css';
import FieldBasicInfo from '../presentations/FieldBasicInfo';
import FormSection from '../presentations/FormSection';

const FormAdmin = () => {
  const steps = [
    { id: 'basic-information', label: 'Basic Information' },
    { id: 'details', label: 'Details' },
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
      <div>
        <Activity mode={currentStep === 0 ? 'visible' : 'hidden'}>
          <div>
            <FormSection title="Basic Information">
              <FieldBasicInfo />
            </FormSection>
            <button onClick={handleStepComplete}>Mark as Complete</button>
          </div>
        </Activity>
        <Activity mode={currentStep === 1 ? 'visible' : 'hidden'}>
          <div>
            <div>Details Content</div>
            <button onClick={handleStepComplete}>Mark as Complete</button>
          </div>
        </Activity>
      </div>
    </div>
  );
};

export default FormAdmin;
