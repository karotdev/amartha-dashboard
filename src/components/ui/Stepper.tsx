import { Activity } from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import styles from './Stepper.module.css';
import type { Step } from '../../types';

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
              <Activity mode={isCompleted ? 'hidden' : 'visible'}>
                {index + 1}
              </Activity>
              <Activity mode={isCompleted ? 'visible' : 'hidden'}>
                <CheckIcon
                  size={16}
                  data-testid="stepper-step-completed-icon"
                />
              </Activity>
            </span>
            <span>{step.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Stepper;
