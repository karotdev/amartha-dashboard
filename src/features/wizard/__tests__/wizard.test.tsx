import { render } from "@testing-library/react";
import WizardPage from "..";

describe('WizardPage', () => {
  it('should have 2 custom radio roles ', () => {
    const { getByTestId} = render(<WizardPage />);
    expect(getByTestId('custom-radio-admin')).toBeInTheDocument();
    expect(getByTestId('custom-radio-operations')).toBeInTheDocument();
  });
});