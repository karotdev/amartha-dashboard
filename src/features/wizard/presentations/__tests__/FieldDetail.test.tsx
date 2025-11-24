import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import FieldDetail from '../FieldDetail';
import { vi } from 'vitest';
import type { DetailsInput } from '../../../schemas/details.schema';

vi.mock('../../select-location', () => ({
  default: ({ ...props }: { label?: string }) => (
    <div>
      <label htmlFor="location">Location</label>
      <input id="location" placeholder="Enter location" {...props} />
    </div>
  ),
}));

const TestWrapper = () => {
  const { register, formState, watch, setValue } = useForm<DetailsInput>({
    defaultValues: {
      photo: '',
      employmentType: '',
      locationId: 0,
      notes: '',
      submissionId: '',
    },
  });

  return (
    <FieldDetail
      register={register}
      errors={formState.errors}
      watch={watch}
      setValue={setValue}
    />
  );
};

describe('FieldDetail', () => {
  it('should display all form fields that users can see and interact with', () => {
    render(<TestWrapper />);
    expect(screen.getByLabelText(/photo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/employment type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
  });

  it('should allow users to select a photo file', async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/photo/i) as HTMLInputElement;

    await user.upload(fileInput, file);

    expect(fileInput.files?.[0]).toBe(file);
  });

  it('should allow users to type in the notes field', async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const notesInput = screen.getByLabelText(/notes/i) as HTMLInputElement;
    await user.type(notesInput, 'Additional notes');

    expect(notesInput.value).toBe('Additional notes');
  });
});
