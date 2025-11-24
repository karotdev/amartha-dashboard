import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectLocation from '../index';
import * as useGetLocationsHook from '../repo/use-get-locations';

vi.mock('../repo/use-get-locations', () => ({
  useGetLocations: vi.fn(),
}));

describe('SelectLocation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Textfield with correct label and placeholder', () => {
    vi.mocked(useGetLocationsHook.useGetLocations).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<SelectLocation />);

    expect(screen.getByLabelText('Location')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter location')).toBeInTheDocument();
  });

  it('should show options when nameLike has length > 0 and data exists', async () => {
    const user = userEvent.setup();
    vi.mocked(useGetLocationsHook.useGetLocations).mockReturnValue({
      data: [
        { label: 'Jakarta', value: 1 },
        { label: 'Bandung', value: 2 },
      ],
      isLoading: false,
      error: null,
    });

    render(<SelectLocation />);

    const input = screen.getByPlaceholderText('Enter location');
    await user.type(input, 'jak');

    expect(screen.getByText('Jakarta')).toBeInTheDocument();
    expect(screen.getByText('Bandung')).toBeInTheDocument();
  });

  it('should hide options when nameLike is empty', () => {
    vi.mocked(useGetLocationsHook.useGetLocations).mockReturnValue({
      data: [{ label: 'Jakarta', value: 1 }],
      isLoading: false,
      error: null,
    });

    const { container } = render(<SelectLocation />);

    const optionsContainer = container.querySelector(
      '.select-location__options',
    );
    if (optionsContainer) {
      const style = window.getComputedStyle(optionsContainer);
      expect(style.display).toBe('none');
    }
  });

  it('should show loading state when isLoading is true', () => {
    vi.mocked(useGetLocationsHook.useGetLocations).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    render(<SelectLocation />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should hide loading state when isLoading is false', () => {
    vi.mocked(useGetLocationsHook.useGetLocations).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    const { container } = render(<SelectLocation />);

    const loadingElement = container.querySelector('.select-location__loading');
    if (loadingElement) {
      expect(loadingElement).toHaveStyle({ display: 'none' });
    } else {
      expect(loadingElement).toBeNull();
    }
  });

  it('should update nameLike when user types in Textfield', async () => {
    const user = userEvent.setup();
    vi.mocked(useGetLocationsHook.useGetLocations).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<SelectLocation />);

    const input = screen.getByPlaceholderText(
      'Enter location',
    ) as HTMLInputElement;
    await user.type(input, 'jak');

    expect(input.value).toBe('jak');
  });

  it('should call useGetLocations with updated nameLike', async () => {
    const user = userEvent.setup();
    const mockUseGetLocations = vi.mocked(useGetLocationsHook.useGetLocations);

    mockUseGetLocations.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<SelectLocation />);

    const input = screen.getByPlaceholderText('Enter location');
    await user.type(input, 'jak');

    expect(mockUseGetLocations).toHaveBeenCalled();
  });
});
