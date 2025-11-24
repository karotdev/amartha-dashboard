import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import FormOps from '..';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock('../select-location/repo/use-get-locations', () => ({
  useGetLocations: () => ({
    data: [
      { label: 'Jakarta', value: 1 },
      { label: 'Bandung', value: 2 },
    ],
    isLoading: false,
    error: null,
  }),
}));

vi.mock('../repo/use-submit-employees-details', () => ({
  useSubmitEmployeesDetails: () => ({
    submitEmployeesDetails: vi.fn().mockResolvedValue({
      id: 1,
      photo: 'data:image/png;base64,test',
      employmentType: 'Full-time',
      locationId: 1,
      notes: '',
    }),
    isPending: false,
    error: null,
  }),
}));

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

const renderFormOps = () => {
  const queryClient = createTestQueryClient();
  return {
    ...render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <FormOps />
        </QueryClientProvider>
      </MemoryRouter>,
    ),
    queryClient,
  };
};

describe('FormOps', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('should render form with title and description', () => {
      renderFormOps();
      expect(screen.getByText('Create Account')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Create your account by completing the necessary steps',
        ),
      ).toBeInTheDocument();
    });

    it('should render stepper with details step', () => {
      renderFormOps();
      expect(screen.getByTestId('step-details')).toBeInTheDocument();
    });

    it('should render details section', () => {
      renderFormOps();
      const detailsSection = screen.getAllByText('Details');
      expect(detailsSection.length).toBeGreaterThan(0);
      expect(
        screen.getByRole('button', { name: /submit/i }),
      ).toBeInTheDocument();
    });
  });

  describe('Form Fields', () => {
    it('should render all details fields', () => {
      renderFormOps();
      expect(screen.getByLabelText(/photo/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/employment type/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should allow notes field to be optional', async () => {
      const user = userEvent.setup();
      renderFormOps();

      const notesInput = screen.getByLabelText(/notes/i);
      await user.click(notesInput);
      await user.tab();

      await waitFor(() => {
        expect(
          screen.queryByText(/notes is required/i),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Interactions', () => {
    it('should allow users to select a photo file', async () => {
      const user = userEvent.setup();
      renderFormOps();

      const file = new File(['test'], 'test.png', { type: 'image/png' });
      const fileInput = screen.getByLabelText(/photo/i) as HTMLInputElement;

      await user.upload(fileInput, file);

      expect(fileInput.files?.[0]).toBe(file);
    });

    it('should allow typing in notes field', async () => {
      const user = userEvent.setup();
      renderFormOps();

      const notesInput = screen.getByLabelText(/notes/i) as HTMLInputElement;
      await user.type(notesInput, 'Test notes');

      expect(notesInput.value).toBe('Test notes');
    });
  });
});
