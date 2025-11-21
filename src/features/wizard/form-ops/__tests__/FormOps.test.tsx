import { MemoryRouter } from 'react-router-dom';
import FormOps from '..';
import { render } from '@testing-library/react';

describe('FormOps', () => {
  it('should render with these fields: photo, employment type, office location, notes', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <FormOps />
      </MemoryRouter>,
    );
    expect(getByTestId('step-details')).toBeInTheDocument();
  });
});
