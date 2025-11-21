import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FormOps from '..';

describe('FormOps', () => {
  it('should have steps', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <FormOps />
      </MemoryRouter>,
    );
    expect(getByTestId('step-details')).toBeInTheDocument();
  });
});
