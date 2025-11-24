import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FormAdmin from '..';
import * as basicInfoService from '../../../../services/basic-info';
import * as detailsService from '../../../../services/details';
import type {
  BasicInfoResponse,
  BasicInfoResponseArray,
} from '../../../../schemas/basic-info.schema';
import type { DetailsResponse } from '../../../../schemas/details.schema';
import type { BasicInfoInput } from '../../../../schemas/basic-info.schema';

vi.mock('../../../../services/basic-info');
vi.mock('../../../../services/details');
const mockSaveDraft = vi.fn();
const mockLoadDraft = vi.fn();
const mockClearDraft = vi.fn();

vi.mock('../../../../hooks/use-local-storage', () => ({
  saveDraft: mockSaveDraft,
  loadDraft: mockLoadDraft,
  clearDraft: mockClearDraft,
}));
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
    localStorage.clear();
    mockSaveDraft.mockClear();
    mockLoadDraft.mockReturnValue(null);
    mockClearDraft.mockClear();
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
      expect(screen.getByText('Basic Information')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    it('should not render details step initially', () => {
      renderFormAdmin();
      expect(screen.queryByText('Details')).not.toBeInTheDocument();
    });
  });

  describe('Step Navigation', () => {
    it('should navigate to details step when Next is clicked', async () => {
      const user = userEvent.setup();
      renderFormAdmin();

      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText('Details')).toBeInTheDocument();
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
    it('should disable Next button when form is invalid', () => {
      renderFormAdmin();
      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeDisabled();
    });

    it('should show validation errors for empty required fields', async () => {
      const user = userEvent.setup();
      renderFormAdmin();

      const fullNameInput = screen.getByLabelText(/full name/i);
      await user.click(fullNameInput);
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
      });
    });

    it('should validate email format', async () => {
      const user = userEvent.setup();
      renderFormAdmin();

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'invalid-email');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/please use valid email/i)).toBeInTheDocument();
      });
    });

    it('should validate employee ID format', async () => {
      const user = userEvent.setup();
      renderFormAdmin();

      const employeeIdInput = screen.getByLabelText(/employee id/i);
      await user.clear(employeeIdInput);
      await user.type(employeeIdInput, 'invalid-id');
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText(/employee id must be in format/i),
        ).toBeInTheDocument();
      });
    });
  });

  describe('Form Validation - Details', () => {
    it('should disable Submit button when details form is invalid', async () => {
      renderFormAdmin(['/wizard?role=admin&step=1']);

      await waitFor(() => {
        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeDisabled();
      });
    });

    it('should validate photo field', async () => {
      const user = userEvent.setup();
      renderFormAdmin(['/wizard?role=admin&step=1']);

      await waitFor(async () => {
        const photoInput = screen.getByLabelText(/photo/i);
        await user.click(photoInput);
        await user.tab();

        await waitFor(() => {
          expect(screen.getByText(/photo is required/i)).toBeInTheDocument();
        });
      });
    });
  });

  describe('Draft Management', () => {
    it('should load draft data on mount', () => {
      const mockDraft = {
        employeeId: 'ENG-001',
        fullName: 'John Doe',
        email: 'john@example.com',
        departmentId: 1,
        role: 'admin',
      };

      mockLoadDraft.mockImplementation((key: string) => {
        if (key === 'admin_basicInfo') return mockDraft as BasicInfoInput;
        return null;
      });

      renderFormAdmin();

      expect(mockLoadDraft).toHaveBeenCalledWith('admin_basicInfo');
    });

    it('should auto-save form data to localStorage after debounce', async () => {
      vi.useFakeTimers();
      const user = userEvent.setup({ delay: null });

      renderFormAdmin();

      const fullNameInput = screen.getByLabelText(/full name/i);
      await user.type(fullNameInput, 'John Doe');

      vi.advanceTimersByTime(2000);

      await waitFor(() => {
        expect(mockSaveDraft).toHaveBeenCalled();
      });

      vi.useRealTimers();
    });
  });

  describe('Employee ID Generation', () => {
    it('should generate employee ID based on department', async () => {
      const mockBasicInfo = [
        {
          id: 1,
          employeeId: 'ENG-001',
          fullName: 'Existing User',
          email: 'existing@example.com',
          departmentId: 1,
          role: 'admin',
        },
      ];

      vi.spyOn(basicInfoService, 'getBasicInfo').mockResolvedValue(
        mockBasicInfo as BasicInfoResponseArray,
      );

      renderFormAdmin();

      await waitFor(() => {
        const employeeIdInput = screen.getByLabelText(/employee id/i);
        expect(employeeIdInput).toHaveValue('ENG-002');
      });
    });

    it('should update employee ID when department changes', async () => {
      const user = userEvent.setup();
      vi.spyOn(basicInfoService, 'getBasicInfo').mockResolvedValue([]);

      renderFormAdmin();

      const departmentInput = screen.getByLabelText(/department/i);
      await user.type(departmentInput, '1');

      await waitFor(() => {
        const employeeIdInput = screen.getByLabelText(
          /employee id/i,
        ) as HTMLInputElement;
        expect(employeeIdInput.value).toMatch(/^ENG-\d{3}$/);
      });
    });
  });

  describe('Form Submission', () => {
    it('should submit basicInfo form and navigate to details step', async () => {
      const user = userEvent.setup();
      const mockResponse = {
        id: 1,
        employeeId: 'ENG-001',
        fullName: 'John Doe',
        email: 'john@example.com',
        departmentId: 1,
        role: 'admin',
        submissionId: 'sub-123',
      };

      vi.spyOn(basicInfoService, 'createBasicInfo').mockResolvedValue(
        mockResponse as BasicInfoResponse,
      );
      vi.spyOn(basicInfoService, 'getBasicInfo').mockResolvedValue([]);

      renderFormAdmin();

      await user.type(screen.getByLabelText(/full name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/department/i), '1');
      await user.type(screen.getByLabelText(/role/i), 'admin');

      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      await waitFor(() => {
        expect(basicInfoService.createBasicInfo).toHaveBeenCalled();
        expect(screen.getByText('Details')).toBeInTheDocument();
      });
    });

    it('should submit details form with submissionId from basicInfo', async () => {
      const user = userEvent.setup();
      const mockBasicInfoResponse = {
        id: 1,
        employeeId: 'ENG-001',
        fullName: 'John Doe',
        email: 'john@example.com',
        departmentId: 1,
        role: 'admin',
        submissionId: 'sub-123',
      };

      const mockDetailsResponse = {
        id: 1,
        photo: 'data:image/png;base64,...',
        employmentType: 'full-time',
        locationId: 1,
        notes: '',
        submissionId: 'sub-123',
      };

      vi.spyOn(basicInfoService, 'createBasicInfo').mockResolvedValue(
        mockBasicInfoResponse as BasicInfoResponse,
      );
      vi.spyOn(detailsService, 'createDetails').mockResolvedValue(
        mockDetailsResponse as DetailsResponse,
      );
      vi.spyOn(basicInfoService, 'getBasicInfo').mockResolvedValue([]);

      renderFormAdmin(['/wizard?role=admin&step=1']);

      await waitFor(async () => {
        const photoInput = screen.getByLabelText(/photo/i);
        await user.type(photoInput, 'data:image/png;base64,test');
        await user.type(screen.getByLabelText(/employment type/i), 'full-time');
        await user.type(screen.getByLabelText(/office location/i), '1');
      });

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(detailsService.createDetails).toHaveBeenCalledWith(
          expect.objectContaining({
            submissionId: 'sub-123',
          }),
        );
      });
    });

    it('should handle API errors gracefully', async () => {
      const user = userEvent.setup();
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      vi.spyOn(basicInfoService, 'createBasicInfo').mockRejectedValue(
        new Error('API Error'),
      );
      vi.spyOn(basicInfoService, 'getBasicInfo').mockResolvedValue([]);

      renderFormAdmin();

      await user.type(screen.getByLabelText(/full name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/department/i), '1');
      await user.type(screen.getByLabelText(/role/i), 'admin');

      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      await waitFor(() => {
        expect(basicInfoService.createBasicInfo).toHaveBeenCalled();
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Form State Management', () => {
    it('should maintain form state when navigating between steps', async () => {
      const user = userEvent.setup();
      vi.spyOn(basicInfoService, 'getBasicInfo').mockResolvedValue([]);

      renderFormAdmin();

      await user.type(screen.getByLabelText(/full name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/department/i), '1');
      await user.type(screen.getByLabelText(/role/i), 'admin');

      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      await waitFor(() => {
        const basicInfoStep = screen.getByTestId('step-basic-information');
        user.click(basicInfoStep);
      });

      await waitFor(() => {
        expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
      });
    });
  });
});
