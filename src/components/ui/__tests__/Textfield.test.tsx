import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textfield from '../Textfield';

describe('Textfield', () => {
  it('should display label and placeholder that users can see', () => {
    render(
      <Textfield
        label="Employee ID"
        id="employee-id"
        placeholder="Enter employee ID"
      />,
    );
    expect(screen.getByLabelText('Employee ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter employee ID')).toBeInTheDocument();
  });

  it('should allow users to type in the input field', async () => {
    const user = userEvent.setup();
    render(
      <Textfield
        label="Employee ID"
        id="employee-id"
        placeholder="Enter employee ID"
      />,
    );

    const input = screen.getByLabelText('Employee ID') as HTMLInputElement;
    await user.type(input, 'ENG-001');

    expect(input.value).toBe('ENG-001');
  });

  it('should render without label when label is not provided', () => {
    render(<Textfield id="employee-id" placeholder="Enter employee ID" />);

    expect(screen.getByPlaceholderText('Enter employee ID')).toBeInTheDocument();
    expect(screen.queryByLabelText('Employee ID')).not.toBeInTheDocument();
  });

  it('should display readonly value that users can see but not edit', async () => {
    const user = userEvent.setup();
    render(
      <Textfield
        label="Employee ID"
        id="employee-id"
        placeholder="Enter employee ID"
        readOnly
        value="ENG-001"
      />,
    );

    const input = screen.getByLabelText('Employee ID') as HTMLInputElement;
    expect(input.value).toBe('ENG-001');
    expect(input).toHaveAttribute('readonly');

    await user.type(input, 'NEW');
    expect(input.value).toBe('ENG-001');
  });
});
