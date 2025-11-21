import { useSearchParams } from 'react-router-dom';

interface Step {
  id: string;
  label: string;
}

interface UseStepperReturn {
  currentStep: number;
  completedSteps: Set<number>;
  handleStepClick: (stepIndex: number) => void;
  handleStepComplete: () => void;
}

export const useStepper = (steps: Step[]): UseStepperReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentStep = parseInt(searchParams.get('step') || '0', 10);
  const completedStepsParam = searchParams.get('completed') || '';
  const completedSteps = new Set<number>(
    completedStepsParam
      ? completedStepsParam.split(',').map((s) => parseInt(s, 10))
      : [],
  );

  const handleStepClick = (stepIndex: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('step', stepIndex.toString());
    setSearchParams(newParams);
  };

  const handleStepComplete = () => {
    const newCompletedSteps = new Set(completedSteps);
    newCompletedSteps.add(currentStep);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('completed', Array.from(newCompletedSteps).join(','));

    if (currentStep < steps.length - 1) {
      newParams.set('step', (currentStep + 1).toString());
    }

    setSearchParams(newParams);
  };

  return {
    currentStep,
    completedSteps,
    handleStepClick,
    handleStepComplete,
  };
};
