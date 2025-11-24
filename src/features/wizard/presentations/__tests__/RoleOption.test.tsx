import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import RoleOption from '../RoleOption';

describe('RoleOption', () => {
  it('should display label and description that users can see', () => {
    render(
      <RoleOption
        checked={false}
        id="role-option"
        label="Admin"
        description="Admin role with full access"
        onChange={() => {}}
      />,
    );
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Admin role with full access')).toBeInTheDocument();
  });

  it('should allow users to select the option', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <RoleOption
        checked={false}
        id="role-option"
        label="Admin"
        description="Admin role with full access"
        onChange={handleChange}
      />,
    );

    const option = screen.getByText('Admin');
    await user.click(option);

    expect(handleChange).toHaveBeenCalled();
  });

  it('should show as selected when checked', () => {
    render(
      <RoleOption
        checked={true}
        id="role-option"
        label="Admin"
        description="Admin role with full access"
        onChange={() => {}}
      />,
    );
    const radioInput = screen.getByRole('radio', { name: /admin/i }) as HTMLInputElement;
    expect(radioInput.checked).toBe(true);
  });

  it('should show as unselected when not checked', () => {
    render(
      <RoleOption
        checked={false}
        id="role-option"
        label="Admin"
        description="Admin role with full access"
        onChange={() => {}}
      />,
    );
    const radioInput = screen.getByRole('radio', { name: /admin/i }) as HTMLInputElement;
    expect(radioInput.checked).toBe(false);
  });
});
