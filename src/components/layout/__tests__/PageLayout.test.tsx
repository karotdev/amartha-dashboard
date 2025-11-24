import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import PageLayout from '../PageLayout';

describe('PageLayout', () => {
  it('should render header, sidebar, and page content that users can see', () => {
    render(
      <MemoryRouter>
        <PageLayout>
          <div>Page Content</div>
        </PageLayout>
      </MemoryRouter>,
    );
    expect(screen.getAllByText('Amartha').length).toBeGreaterThan(0);
    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });
});
