import { render } from '@testing-library/react';
import FormTitle from '../FormTitle';

describe('FormTitle', () => {
  it('should render with title and description', () => {
    const { getByText } = render(
      <FormTitle title="Test Title" description="Test Description" />,
    );
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
  });
});
