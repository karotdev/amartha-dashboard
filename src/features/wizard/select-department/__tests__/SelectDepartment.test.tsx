import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectDepartment from '../index';
import * as useGetDepartmentsHook from '../repo/use-get-departments';

vi.mock('../repo/use-get-departments', () => ({
  useGetDepartments: vi.fn(),
}));

describe('SelectDepartment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display label and placeholder that users can see', () => {
    vi.mocked(useGetDepartmentsHook.useGetDepartments).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<SelectDepartment />);

    expect(screen.getByLabelText('Department')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter department')).toBeInTheDocument();
  });

  it('should show department options that users can see when typing in the field', async () => {
    const user = userEvent.setup();
    vi.mocked(useGetDepartmentsHook.useGetDepartments).mockReturnValue({
      data: [
        { label: 'Engineering', value: 1 },
        { label: 'Operations', value: 2 },
      ],
      isLoading: false,
      error: null,
    });

    render(<SelectDepartment />);

    const input = screen.getByPlaceholderText('Enter department');
    await user.type(input, 'eng');

    expect(screen.getByText('Engineering')).toBeVisible();
    expect(screen.getByText('Operations')).toBeVisible();
  });

  it('should not show options when user has not typed anything', () => {
    vi.mocked(useGetDepartmentsHook.useGetDepartments).mockReturnValue({
      data: [{ label: 'Engineering', value: 1 }],
      isLoading: false,
      error: null,
    });

    render(<SelectDepartment />);

    const engineeringOption = screen.queryByText('Engineering');
    if (engineeringOption) {
      expect(engineeringOption).not.toBeVisible();
    } else {
      expect(engineeringOption).not.toBeInTheDocument();
    }
  });

  it('should show loading message when searching', () => {
    vi.mocked(useGetDepartmentsHook.useGetDepartments).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    render(<SelectDepartment />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should allow users to type and see their input', async () => {
    const user = userEvent.setup();
    vi.mocked(useGetDepartmentsHook.useGetDepartments).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<SelectDepartment />);

    const input = screen.getByPlaceholderText(
      'Enter department',
    ) as HTMLInputElement;
    await user.type(input, 'eng');

    expect(input.value).toBe('eng');
  });

  it('should allow users to select a department option', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    vi.mocked(useGetDepartmentsHook.useGetDepartments).mockReturnValue({
      data: [
        { label: 'Engineering', value: 1 },
        { label: 'Operations', value: 2 },
      ],
      isLoading: false,
      error: null,
    });

    render(<SelectDepartment onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Enter department');
    await user.type(input, 'eng');

    expect(screen.getByText('Engineering')).toBeVisible();
    expect(screen.getByText('Operations')).toBeVisible();

    await user.click(screen.getByText('Engineering'));

    expect(handleChange).toHaveBeenCalledWith('Engineering', 1);
    expect((input as HTMLInputElement).value).toBe('Engineering');
  });

  it('should hide options from view when user clicks outside', async () => {
    const user = userEvent.setup();
    vi.mocked(useGetDepartmentsHook.useGetDepartments).mockReturnValue({
      data: [{ label: 'Engineering', value: 1 }],
      isLoading: false,
      error: null,
    });

    render(<SelectDepartment />);

    const input = screen.getByPlaceholderText('Enter department');
    await user.type(input, 'eng');

    expect(screen.getByText('Engineering')).toBeVisible();

    await user.click(document.body);

    expect(screen.getByText('Engineering')).not.toBeVisible();
  });
});
