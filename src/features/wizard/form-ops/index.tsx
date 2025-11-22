import { useGetLocations } from './repo/use-get-locations';
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

const FormOps = () => {
  const { currentStep, completedSteps, handleStepClick, handleStepComplete } =
    useStepper(WIZARD_STEPS_OPS);

  const { data: locations } = useGetLocations();
  console.log({ locations });

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
    </FormLayout>
  );
};

export default FormOps;
