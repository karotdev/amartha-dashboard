import { render } from '@testing-library/react';
import FormSection from '../FormSection';

describe('FormSection', () => {
  it('should render with title and children', () => {
    const { getByText } = render(
      <FormSection title="Test Title">
        <div>Test Children</div>
      </FormSection>,
    );
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Children')).toBeInTheDocument();
  });
});
