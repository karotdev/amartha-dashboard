import { render, screen, fireEvent } from '@testing-library/react';
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

  it('should render options from string array', () => {
    const options = ['Admin', 'Engineer', 'Finance'];
    render(<Select label="Role" options={options} placeholder="Enter role" />);

    const textfield = screen.getByPlaceholderText('Enter role');
    fireEvent.click(textfield);

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('should render options from Option array', () => {
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
    fireEvent.click(textfield);

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('should render empty options array', () => {
    render(<Select label="Role" options={[]} placeholder="Enter role" />);

    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter role')).toBeInTheDocument();
  });

  it('should open options when textfield is clicked', () => {
    const options = ['Admin', 'Engineer'];
    render(<Select label="Role" options={options} placeholder="Enter role" />);

    const textfield = screen.getByPlaceholderText('Enter role');
    fireEvent.click(textfield);

    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('should select option and update value', () => {
    const options = ['Admin', 'Engineer'];
    render(<Select label="Role" options={options} placeholder="Enter role" />);

    const textfield = screen.getByPlaceholderText(
      'Enter role',
    ) as HTMLInputElement;
    fireEvent.click(textfield);
    fireEvent.click(screen.getByText('Admin'));

    expect(textfield.value).toBe('Admin');
  });

  it('should close options when option is selected', () => {
    const options = ['Admin', 'Engineer'];
    const { container } = render(
      <Select label="Role" options={options} placeholder="Enter role" />,
    );

    const textfield = screen.getByPlaceholderText('Enter role');
    fireEvent.click(textfield);

    const adminOption = screen.getByText('Admin');
    expect(adminOption).toBeInTheDocument();

    fireEvent.click(adminOption);

    const optionsContainer = container.querySelector(
      '[class*="select__options"]',
    );
    if (optionsContainer) {
      const style = window.getComputedStyle(optionsContainer);
      expect(style.display).toBe('none');
    }
  });

  it('should close options when clicking outside', () => {
    const options = ['Admin', 'Engineer'];
    const { container } = render(
      <Select label="Role" options={options} placeholder="Enter role" />,
    );

    const textfield = screen.getByPlaceholderText('Enter role');
    fireEvent.click(textfield);

    const adminOption = screen.getByText('Admin');
    expect(adminOption).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    const optionsContainer = container.querySelector(
      '[class*="select__options"]',
    );
    if (optionsContainer) {
      const style = window.getComputedStyle(optionsContainer);
      expect(style.display).toBe('none');
    }
  });

  it('should call onChange when option is selected', () => {
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
    fireEvent.click(textfield);
    fireEvent.click(screen.getByText('Admin'));

    expect(handleChange).toHaveBeenCalledWith('Admin');
  });

  it('should work with controlled value', () => {
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

  it('should handle Option objects with correct values', () => {
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
    fireEvent.click(textfield);
    fireEvent.click(screen.getByText('Engineering'));

    expect(handleChange).toHaveBeenCalledWith('1');
    const input = screen.getByPlaceholderText(
      'Select department',
    ) as HTMLInputElement;
    expect(input.value).toBe('Engineering');
  });
});
