import { render } from '@testing-library/react';
import Stepper from '../Stepper';

describe('Stepper', () => {
  it('should have steps', () => {
    const { getByTestId } = render(
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
    expect(getByTestId('step-basic-information')).toBeInTheDocument();
    expect(getByTestId('step-details')).toBeInTheDocument();
  });
});
