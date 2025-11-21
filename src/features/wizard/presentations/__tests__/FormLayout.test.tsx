import {
  FormLayout,
  FormLayoutActions,
  FormLayoutContent,
  FormLayoutHeader,
} from '../FormLayout';
import { render } from '@testing-library/react';

describe('FormLayout', () => {
  it('should render with children', () => {
    const { getByText } = render(
      <FormLayout>
        <div>Test Children</div>
      </FormLayout>,
    );
    expect(getByText('Test Children')).toBeInTheDocument();
  });

  it('should render with header', () => {
    const { getByText } = render(
      <FormLayout>
        <FormLayoutHeader>
          <div>Test Header</div>
        </FormLayoutHeader>
      </FormLayout>,
    );
    expect(getByText('Test Header')).toBeInTheDocument();
  });

  it('should render with content', () => {
    const { getByText } = render(
      <FormLayout>
        <FormLayoutContent>
          <div>Test Content</div>
        </FormLayoutContent>
      </FormLayout>,
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('should render with actions', () => {
    const { getByText } = render(
      <FormLayout>
        <FormLayoutActions>
          <div>Test Actions</div>
        </FormLayoutActions>
      </FormLayout>,
    );
    expect(getByText('Test Actions')).toBeInTheDocument();
  });
});
