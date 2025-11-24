import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Select from '../Select';
import type { Option } from '../../../types';

describe('Select', () => {
  it('should render with label and placeholder', () => {
    render(
      <Select
        label="Role"
        options={['Admin', 'Engineer']}
        placeholder="Enter role"
      />,
    );

    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter role')).toBeInTheDocument();
  });

  it('should show options that users can see when clicking on the select field', async () => {
    const user = userEvent.setup();
    const options = ['Admin', 'Engineer', 'Finance'];
    render(<Select label="Role" options={options} placeholder="Enter role" />);

    const textfield = screen.getByPlaceholderText('Enter role');
    await user.click(textfield);

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeVisible();
    });
  });

  it('should show option labels that users can see', async () => {
    const user = userEvent.setup();
    const options: Option[] = [
      { label: 'Engineering', value: 1 },
      { label: 'Operations', value: 2 },
      { label: 'Finance', value: 3 },
    ];

    render(
      <Select
        label="Department"
        options={options}
        placeholder="Select department"
      />,
    );

    const textfield = screen.getByPlaceholderText('Select department');
    await user.click(textfield);

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeVisible();
    });
  });

  it('should render empty options array', () => {
    render(<Select label="Role" options={[]} placeholder="Enter role" />);

    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter role')).toBeInTheDocument();
  });

  it('should show options that users can see when clicking the select field', async () => {
    const user = userEvent.setup();
    const options = ['Admin', 'Engineer'];
    render(<Select label="Role" options={options} placeholder="Enter role" />);

    const textfield = screen.getByPlaceholderText('Enter role');
    await user.click(textfield);

    expect(screen.getByText('Admin')).toBeVisible();
    expect(screen.getByText('Engineer')).toBeVisible();
  });

  it('should display selected option value that user can see', async () => {
    const user = userEvent.setup();
    const options = ['Admin', 'Engineer'];
    render(<Select label="Role" options={options} placeholder="Enter role" />);

    const textfield = screen.getByPlaceholderText(
      'Enter role',
    ) as HTMLInputElement;
    await user.click(textfield);
    await user.click(screen.getByText('Admin'));

    expect(textfield.value).toBe('Admin');
  });

  it('should hide options from view when user selects an option', async () => {
    const user = userEvent.setup();
    const options = ['Admin', 'Engineer'];
    render(
      <Select label="Role" options={options} placeholder="Enter role" />,
    );

    const textfield = screen.getByPlaceholderText('Enter role');
    await user.click(textfield);

    expect(screen.getByText('Admin')).toBeVisible();
    expect(screen.getByText('Engineer')).toBeVisible();

    await user.click(screen.getByText('Admin'));

    expect(screen.getByText('Engineer')).not.toBeVisible();
  });

  it('should hide options from view when user clicks outside', async () => {
    const user = userEvent.setup();
    const options = ['Admin', 'Engineer'];
    render(
      <Select label="Role" options={options} placeholder="Enter role" />,
    );

    const textfield = screen.getByPlaceholderText('Enter role');
    await user.click(textfield);

    expect(screen.getByText('Admin')).toBeVisible();
    expect(screen.getByText('Engineer')).toBeVisible();

    await user.click(document.body);

    expect(screen.getByText('Admin')).not.toBeVisible();
    expect(screen.getByText('Engineer')).not.toBeVisible();
  });

  it('should call onChange when user selects an option', async () => {
    const user = userEvent.setup();
    const options = ['Admin', 'Engineer'];
    const handleChange = vi.fn();
    render(
      <Select
        label="Role"
        options={options}
        placeholder="Enter role"
        onChange={handleChange}
      />,
    );

    const textfield = screen.getByPlaceholderText('Enter role');
    await user.click(textfield);
    await user.click(screen.getByText('Admin'));

    expect(handleChange).toHaveBeenCalledWith('Admin');
  });

  it('should display controlled value that user can see', () => {
    const options = ['Admin', 'Engineer'];
    const { rerender } = render(
      <Select
        label="Role"
        options={options}
        placeholder="Enter role"
        value="Admin"
      />,
    );

    const textfield = screen.getByPlaceholderText(
      'Enter role',
    ) as HTMLInputElement;
    expect(textfield.value).toBe('Admin');

    rerender(
      <Select
        label="Role"
        options={options}
        placeholder="Enter role"
        value="Engineer"
      />,
    );

    expect(textfield.value).toBe('Engineer');
  });

  it('should display option label when user selects Option object', async () => {
    const user = userEvent.setup();
    const options: Option[] = [
      { label: 'Engineering', value: 1 },
      { label: 'Operations', value: 2 },
    ];
    const handleChange = vi.fn();

    render(
      <Select
        label="Department"
        options={options}
        placeholder="Select department"
        onChange={handleChange}
      />,
    );

    const textfield = screen.getByPlaceholderText('Select department');
    await user.click(textfield);
    await user.click(screen.getByText('Engineering'));

    expect(handleChange).toHaveBeenCalledWith('1');
    const input = screen.getByPlaceholderText(
      'Select department',
    ) as HTMLInputElement;
    expect(input.value).toBe('Engineering');
  });

  it('should render without label', () => {
    render(<Select options={['Admin']} placeholder="Enter role" />);

    expect(screen.getByPlaceholderText('Enter role')).toBeInTheDocument();
    expect(screen.queryByText('Role')).not.toBeInTheDocument();
  });

  it('should not show any options when no options provided', async () => {
    const user = userEvent.setup();
    render(<Select label="Role" placeholder="Enter role" />);

    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter role')).toBeInTheDocument();

    const textfield = screen.getByPlaceholderText('Enter role');
    await user.click(textfield);

    expect(screen.queryByText('Admin')).not.toBeInTheDocument();
    expect(screen.queryByText('Engineer')).not.toBeInTheDocument();
  });

  it('should render without placeholder', () => {
    render(<Select id="role" label="Role" options={['Admin']} />);

    expect(screen.getByText('Role')).toBeInTheDocument();
    const input = screen.getByLabelText('Role') as HTMLInputElement;
    expect(input.placeholder).toBe('');
  });

  it('should render with all optional props omitted', () => {
    render(<Select />);

    const input = document.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input?.placeholder).toBe('');
  });

  it('should display error message when error prop is provided', () => {
    render(
      <Select
        label="Role"
        options={['Admin']}
        placeholder="Enter role"
        error="This field is required"
      />,
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should call onBlur when user leaves the select field', async () => {
    const user = userEvent.setup();
    const handleBlur = vi.fn();
    render(
      <Select
        label="Role"
        options={['Admin']}
        placeholder="Enter role"
        onBlur={handleBlur}
      />,
    );

    const textfield = screen.getByPlaceholderText('Enter role');
    await user.click(textfield);
    await user.tab();

    expect(handleBlur).toHaveBeenCalled();
  });
});
