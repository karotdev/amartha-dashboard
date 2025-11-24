import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FormAdmin from '..';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});


vi.mock('../select-department/repo/use-get-departments', () => ({
  useGetDepartments: () => ({
    data: [
      { label: 'Engineering', value: 1 },
      { label: 'Operations', value: 2 },
    ],
    isLoading: false,
    error: null,
  }),
}));

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

vi.mock('../../employees/repo/use-get-employees-basic-info', () => ({
  useGetEmployeesBasicInfo: () => ({
    data: [],
    isLoading: false,
    error: null,
  }),
}));

vi.mock('../repo/use-submit-employees-basic-info', () => ({
  useSubmitEmployeesBasicInfo: () => ({
    submitEmployeesBasicInfo: vi.fn().mockResolvedValue({
      id: 1,
      employeeId: 'ENG-001',
      fullName: 'Test User',
      email: 'test@example.com',
      departmentId: 1,
      role: 'Admin',
    }),
    isPending: false,
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

const renderFormAdmin = (initialEntries = ['/wizard?role=admin']) => {
  const queryClient = createTestQueryClient();
  return {
    ...render(
      <MemoryRouter initialEntries={initialEntries}>
        <QueryClientProvider client={queryClient}>
          <FormAdmin />
        </QueryClientProvider>
      </MemoryRouter>,
    ),
    queryClient,
  };
};

describe('FormAdmin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('should render form with title and description', () => {
      renderFormAdmin();
      expect(screen.getByText('Create Account')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Create your account by completing the necessary steps',
        ),
      ).toBeInTheDocument();
    });

    it('should render stepper with both steps', () => {
      renderFormAdmin();
      expect(screen.getByTestId('step-basic-information')).toBeInTheDocument();
      expect(screen.getByTestId('step-details')).toBeInTheDocument();
    });

    it('should render basic information step initially', () => {
      renderFormAdmin();
      const basicInfoSections = screen.getAllByText('Basic Information');
      expect(basicInfoSections.length).toBeGreaterThan(0);
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    it('should not render details step initially', () => {
      renderFormAdmin();
      const submitButton = screen.queryByRole('button', { name: /submit/i });
      expect(submitButton).not.toBeInTheDocument();
    });
  });

  describe('Step Navigation', () => {
    it('should not navigate to details step when Next is clicked with invalid form', async () => {
      const user = userEvent.setup();
      renderFormAdmin();

      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      await waitFor(() => {
        const submitButton = screen.queryByRole('button', { name: /submit/i });
        expect(submitButton).not.toBeInTheDocument();
      });
    });

    it('should validate form before navigating to next step', async () => {
      const user = userEvent.setup();
      renderFormAdmin();

      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      await waitFor(() => {
        const submitButton = screen.queryByRole('button', { name: /submit/i });
        expect(submitButton).not.toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
      });
    });

    it('should show Submit button on details step', async () => {
      renderFormAdmin(['/wizard?role=admin&step=1']);

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /submit/i }),
        ).toBeInTheDocument();
      });
    });
  });

  describe('Form Validation - Basic Info', () => {
    it('should show employee ID field as readonly', () => {
      renderFormAdmin();
      const employeeIdInput = screen.getByLabelText(
        /employee id/i,
      ) as HTMLInputElement;
      expect(employeeIdInput).toHaveAttribute('readonly');
    });
  });

  describe('Form Fields', () => {
    it('should render all basic info fields', () => {
      renderFormAdmin();
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/department/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/employee id/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    });

    it('should render all details fields', async () => {
      renderFormAdmin(['/wizard?role=admin&step=1']);

      await waitFor(() => {
        expect(screen.getByLabelText(/photo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/employment type/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
      });
    });
  });
});
