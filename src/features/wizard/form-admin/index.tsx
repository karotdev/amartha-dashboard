import { Activity } from 'react';
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

const FormAdmin = () => {
  const { currentStep, completedSteps, handleStepClick, handleStepComplete } =
    useStepper(WIZARD_STEPS_ADMIN);

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
      <Activity mode={currentStep === 0 ? 'visible' : 'hidden'}>
        <FormLayoutSection title="Basic Information">
          <FormLayoutContent>
            <FieldBasicInfo />
            <FormLayoutActions>
              <Button type="button" onClick={handleStepComplete}>
                Next
              </Button>
            </FormLayoutActions>
          </FormLayoutContent>
        </FormLayoutSection>
      </Activity>
      <Activity mode={currentStep === 1 ? 'visible' : 'hidden'}>
        <FormLayoutSection title="Details">
          <FormLayoutContent>
            <FieldDetail />
            <FormLayoutActions>
              <Button type="submit" onClick={handleStepComplete}>
                Submit
              </Button>
            </FormLayoutActions>
          </FormLayoutContent>
        </FormLayoutSection>
      </Activity>
    </FormLayout>
  );
};

export default FormAdmin;
