import { Activity } from 'react';
import { useStepper } from '../../../hooks/use-stepper';
import FieldBasicInfo from '../presentations/FieldBasicInfo';
import FieldDetail from '../presentations/FieldDetail';
import FormSection from '../presentations/FormSection';
import FormTitle from '../presentations/FormTitle';
import Stepper from '../../../components/ui/Stepper';
import {
  FormLayout,
  FormLayoutActions,
  FormLayoutContent,
  FormLayoutHeader,
} from '../presentations/FormLayout';
import { WIZARD_STEPS_ADMIN } from '../../../constants';
import Button from '../../../components/ui/Button';

const FormAdmin = () => {
  const { currentStep, completedSteps, handleStepClick, handleStepComplete } =
    useStepper(WIZARD_STEPS_ADMIN);

  return (
    <FormLayout>
      <FormLayoutHeader>
        <FormTitle
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
      <Activity mode={currentStep === 0 ? 'visible' : 'hidden'}>
        <FormSection title="Basic Information">
          <FormLayoutContent>
            <FieldBasicInfo />
            <FormLayoutActions>
              <Button type="button" onClick={handleStepComplete}>
                Next
              </Button>
            </FormLayoutActions>
          </FormLayoutContent>
        </FormSection>
      </Activity>
      <Activity mode={currentStep === 1 ? 'visible' : 'hidden'}>
        <FormSection title="Details">
          <FormLayoutContent>
            <FieldDetail />
            <FormLayoutActions>
              <Button type="submit" onClick={handleStepComplete}>
                Submit
              </Button>
            </FormLayoutActions>
          </FormLayoutContent>
        </FormSection>
      </Activity>
    </FormLayout>
  );
};

export default FormAdmin;
