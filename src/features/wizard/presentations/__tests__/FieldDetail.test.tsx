import { render } from '@testing-library/react';
import FieldDetail from '../FieldDetail';

describe('FieldDetail', () => {
  it('should render with these fields: photo, employment type, office location, notes', () => {
    const { getByText } = render(<FieldDetail />);
    expect(getByText('Photo')).toBeInTheDocument();
    expect(getByText('Employment Type')).toBeInTheDocument();
    expect(getByText('Office Location')).toBeInTheDocument();
    expect(getByText('Notes')).toBeInTheDocument();
  });
});
