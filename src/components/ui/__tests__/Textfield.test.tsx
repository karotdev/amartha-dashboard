import { render } from '@testing-library/react';
import Textfield from '../Textfield';

describe('Textfield', () => {
  it('should render', () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <Textfield
        label="Employee ID"
        id="employee-id"
        placeholder="Enter employee ID"
      />,
    );
    expect(getByLabelText('Employee ID')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter employee ID')).toBeInTheDocument();
  });
});
