import { render } from '@testing-library/react';
import RoleOption from '../RoleOption';

describe('RoleOption', () => {
  it('should render with label and description', () => {
    const { getByText } = render(
      <RoleOption
        checked={false}
        id="role-option"
        label="Role Option"
        description="Role Option Description"
        onChange={() => {}}
      />,
    );
    expect(getByText('Role Option')).toBeInTheDocument();
  });

  it('should render with checked state', () => {
    const { getByText } = render(
      <RoleOption
        checked={true}
        id="role-option"
        label="Role Option"
        description="Role Option Description"
        onChange={() => {}}
      />,
    );
    expect(getByText('Role Option')).toBeInTheDocument();
  });
});
