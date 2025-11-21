import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FormOps from '../index';

describe('FormOps', () => {
  it('should render with these fields: photo, employment type, office location, notes', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FormOps />
      </MemoryRouter>,
    );
    expect(getByText('Photo')).toBeInTheDocument();
    expect(getByText('Employment Type')).toBeInTheDocument();
    expect(getByText('Office Location')).toBeInTheDocument();
    expect(getByText('Notes')).toBeInTheDocument();
  });
});
