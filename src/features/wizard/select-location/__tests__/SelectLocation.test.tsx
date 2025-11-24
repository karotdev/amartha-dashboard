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

  it('should display label and placeholder that users can see', () => {
    vi.mocked(useGetLocationsHook.useGetLocations).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<SelectLocation />);

    expect(screen.getByLabelText('Location')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter location')).toBeInTheDocument();
  });

  it('should show location options that users can see when typing in the field', async () => {
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

    expect(screen.getByText('Jakarta')).toBeVisible();
    expect(screen.getByText('Bandung')).toBeVisible();
  });

  it('should not show options when user has not typed anything', () => {
    vi.mocked(useGetLocationsHook.useGetLocations).mockReturnValue({
      data: [{ label: 'Jakarta', value: 1 }],
      isLoading: false,
      error: null,
    });

    render(<SelectLocation />);

    const jakartaOption = screen.queryByText('Jakarta');
    if (jakartaOption) {
      expect(jakartaOption).not.toBeVisible();
    } else {
      expect(jakartaOption).not.toBeInTheDocument();
    }
  });

  it('should show loading message when searching', () => {
    vi.mocked(useGetLocationsHook.useGetLocations).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    render(<SelectLocation />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should allow users to type and see their input', async () => {
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

  it('should allow users to select a location option', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    vi.mocked(useGetLocationsHook.useGetLocations).mockReturnValue({
      data: [
        { label: 'Jakarta', value: 1 },
        { label: 'Bandung', value: 2 },
      ],
      isLoading: false,
      error: null,
    });

    render(<SelectLocation onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Enter location');
    await user.type(input, 'jak');

    expect(screen.getByText('Jakarta')).toBeVisible();
    expect(screen.getByText('Bandung')).toBeVisible();

    await user.click(screen.getByText('Jakarta'));

    expect(handleChange).toHaveBeenCalledWith('Jakarta', 1);
    expect((input as HTMLInputElement).value).toBe('Jakarta');
  });

  it('should hide options from view when user clicks outside', async () => {
    const user = userEvent.setup();
    vi.mocked(useGetLocationsHook.useGetLocations).mockReturnValue({
      data: [{ label: 'Jakarta', value: 1 }],
      isLoading: false,
      error: null,
    });

    render(<SelectLocation />);

    const input = screen.getByPlaceholderText('Enter location');
    await user.type(input, 'jak');

    expect(screen.getByText('Jakarta')).toBeVisible();

    await user.click(document.body);

    expect(screen.getByText('Jakarta')).not.toBeVisible();
  });
});
