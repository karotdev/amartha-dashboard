import { cn } from '../../utils/cn';
import styles from './Stepper.module.css';

interface Step {
  id: string;
  label: string;
  dataTestId: string;
}

interface StepperProps {
  completedSteps: Set<number>;
  currentStep: number;
  steps: Step[];
  onStepClick: (stepIndex: number) => void;
}

const Stepper = ({
  completedSteps,
  currentStep,
  steps,
  onStepClick,
}: StepperProps) => {
  const isStepAccessible = (stepIndex: number) => {
    if (stepIndex === 0) return true;
    return completedSteps.has(stepIndex - 1);
  };

  return (
    <div className={styles['stepper']}>
      {steps.map((step, index) => {
        const isAccessible = isStepAccessible(index);
        const isCompleted = completedSteps.has(index);
        const isCurrent = currentStep === index;

        return (
          <button
            key={step.id}
            className={styles['stepper__step']}
            disabled={!isAccessible}
            data-testid={step.dataTestId}
            onClick={() => onStepClick(index)}
          >
            <span
              className={cn(
                styles['stepper__step-number'],
                isCurrent ? styles['stepper__step-number--current'] : '',
              )}
            >
              {index + 1}
            </span>
            <span>{step.label}</span>
            {isCompleted && <span>✓</span>}
          </button>
        );
      })}
    </div>
  );
};

export default Stepper;
