import { useStepper } from '../../../hooks/use-stepper';
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
import { WIZARD_STEPS_OPS } from '../../../constants';
import Button from '../../../components/ui/Button';

const FormOps = () => {
  const { currentStep, completedSteps, handleStepClick, handleStepComplete } =
    useStepper(WIZARD_STEPS_OPS);

  return (
    <FormLayout>
      <FormLayoutHeader>
        <FormTitle
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
    </FormLayout>
  );
};

export default FormOps;
