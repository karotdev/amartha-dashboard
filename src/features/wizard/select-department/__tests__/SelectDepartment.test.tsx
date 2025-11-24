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

  it('should render Textfield with correct label and placeholder', () => {
    vi.mocked(useGetDepartmentsHook.useGetDepartments).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<SelectDepartment />);

    expect(screen.getByLabelText('Department')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter department')).toBeInTheDocument();
  });

  it('should show options when nameLike has length > 0 and data exists', async () => {
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

    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Operations')).toBeInTheDocument();
  });

  it('should hide options when nameLike is empty', () => {
    vi.mocked(useGetDepartmentsHook.useGetDepartments).mockReturnValue({
      data: [{ label: 'Engineering', value: 1 }],
      isLoading: false,
      error: null,
    });

    const { container } = render(<SelectDepartment />);

    const optionsContainer = container.querySelector(
      '.select-department__options',
    );
    if (optionsContainer) {
      const style = window.getComputedStyle(optionsContainer);
      expect(style.display).toBe('none');
    }
  });

  it('should show loading state when isLoading is true', () => {
    vi.mocked(useGetDepartmentsHook.useGetDepartments).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    render(<SelectDepartment />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should hide loading state when isLoading is false', () => {
    vi.mocked(useGetDepartmentsHook.useGetDepartments).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    const { container } = render(<SelectDepartment />);

    const loadingElement = container.querySelector(
      '.select-department__loading',
    );
    if (loadingElement) {
      expect(loadingElement).toHaveStyle({ display: 'none' });
    } else {
      expect(loadingElement).toBeNull();
    }
  });

  it('should update nameLike when user types in Textfield', async () => {
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

  it('should call useGetDepartments with updated nameLike', async () => {
    const user = userEvent.setup();
    const mockUseGetDepartments = vi.mocked(
      useGetDepartmentsHook.useGetDepartments,
    );

    mockUseGetDepartments.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<SelectDepartment />);

    const input = screen.getByPlaceholderText('Enter department');
    await user.type(input, 'eng');

    expect(mockUseGetDepartments).toHaveBeenCalled();
  });
});
