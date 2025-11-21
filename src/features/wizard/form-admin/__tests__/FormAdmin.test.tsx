import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FormAdmin from '..';

describe('FormAdmin', () => {
  it('should have steps', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <FormAdmin />
      </MemoryRouter>,
    );
    expect(getByTestId('step-basic-information')).toBeInTheDocument();
    expect(getByTestId('step-details')).toBeInTheDocument();
  });
});
