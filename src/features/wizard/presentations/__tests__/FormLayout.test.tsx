import {
  FormLayout,
  FormLayoutActions,
  FormLayoutContent,
  FormLayoutHeader,
  FormLayoutSection,
  FormLayoutTitle,
} from '../FormLayout';
import { render, screen } from '@testing-library/react';

describe('FormLayout', () => {
  it('should display children content that users can see', () => {
    render(
      <FormLayout>
        <div>Test Children</div>
      </FormLayout>,
    );
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });

  it('should display header content that users can see', () => {
    render(
      <FormLayout>
        <FormLayoutHeader>
          <div>Test Header</div>
        </FormLayoutHeader>
      </FormLayout>,
    );
    expect(screen.getByText('Test Header')).toBeInTheDocument();
  });

  it('should display content that users can see', () => {
    render(
      <FormLayout>
        <FormLayoutContent>
          <div>Test Content</div>
        </FormLayoutContent>
      </FormLayout>,
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should display action buttons that users can interact with', () => {
    render(
      <FormLayout>
        <FormLayoutActions>
          <button>Submit</button>
        </FormLayoutActions>
      </FormLayout>,
    );
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should display section title that users can see', () => {
    render(
      <FormLayout>
        <FormLayoutSection title="Basic Information">
          <div>Section Content</div>
        </FormLayoutSection>
      </FormLayout>,
    );
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(screen.getByText('Section Content')).toBeInTheDocument();
  });

  it('should display title and description that users can see', () => {
    render(
      <FormLayout>
        <FormLayoutTitle title="Create Account" description="Fill in the form" />
      </FormLayout>,
    );
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByText('Fill in the form')).toBeInTheDocument();
  });
});
