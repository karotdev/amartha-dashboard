import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Stepper from '../Stepper';

describe('Stepper', () => {
  it('should display step labels that users can see', () => {
    render(
      <Stepper
        steps={[
          {
            id: 'basic-information',
            label: 'Basic Information',
            dataTestId: 'step-basic-information',
          },
          { id: 'details', label: 'Details', dataTestId: 'step-details' },
        ]}
        currentStep={0}
        completedSteps={new Set()}
        onStepClick={() => {}}
      />,
    );
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('should show step numbers that users can see', () => {
    render(
      <Stepper
        steps={[
          {
            id: 'basic-information',
            label: 'Basic Information',
            dataTestId: 'step-basic-information',
          },
          { id: 'details', label: 'Details', dataTestId: 'step-details' },
        ]}
        currentStep={0}
        completedSteps={new Set()}
        onStepClick={() => {}}
      />,
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should show checkmark icon when step is completed', () => {
    render(
      <Stepper
        steps={[
          {
            id: 'basic-information',
            label: 'Basic Information',
            dataTestId: 'step-basic-information',
          },
        ]}
        currentStep={0}
        completedSteps={new Set([0])}
        onStepClick={() => {}}
      />,
    );
    const stepButton = screen.getByText('Basic Information');
    expect(stepButton).toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  it('should allow users to click on accessible steps', async () => {
    const user = userEvent.setup();
    const handleStepClick = vi.fn();
    render(
      <Stepper
        steps={[
          {
            id: 'basic-information',
            label: 'Basic Information',
            dataTestId: 'step-basic-information',
          },
          { id: 'details', label: 'Details', dataTestId: 'step-details' },
        ]}
        currentStep={0}
        completedSteps={new Set()}
        onStepClick={handleStepClick}
      />,
    );

    const basicInfoStep = screen.getByText('Basic Information').closest('button');
    if (basicInfoStep) {
      await user.click(basicInfoStep);
      expect(handleStepClick).toHaveBeenCalledWith(0);
    }
  });

  it('should disable steps that are not accessible', () => {
    render(
      <Stepper
        steps={[
          {
            id: 'basic-information',
            label: 'Basic Information',
            dataTestId: 'step-basic-information',
          },
          { id: 'details', label: 'Details', dataTestId: 'step-details' },
        ]}
        currentStep={0}
        completedSteps={new Set()}
        onStepClick={() => {}}
      />,
    );

    const detailsStep = screen.getByText('Details').closest('button');
    expect(detailsStep).toBeDisabled();
  });

  it('should enable steps that are accessible', () => {
    render(
      <Stepper
        steps={[
          {
            id: 'basic-information',
            label: 'Basic Information',
            dataTestId: 'step-basic-information',
          },
          { id: 'details', label: 'Details', dataTestId: 'step-details' },
        ]}
        currentStep={0}
        completedSteps={new Set([0])}
        onStepClick={() => {}}
      />,
    );

    const detailsStep = screen.getByText('Details').closest('button');
    expect(detailsStep).not.toBeDisabled();
  });

  it('should render empty stepper when no steps provided', () => {
    render(<Stepper />);
    expect(screen.queryByText('Basic Information')).not.toBeInTheDocument();
  });
});
