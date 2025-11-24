import { render } from '@testing-library/react';
import FieldDetail from '../FieldDetail';
import { vi } from 'vitest';

vi.mock('../../select-location', () => ({
  default: () => <div>SelectLocation</div>,
}));

describe('FieldDetail', () => {
  it('should render with these fields: photo, employment type, office location, notes', () => {
    const { getByText } = render(<FieldDetail />);
    expect(getByText('Photo')).toBeInTheDocument();
    expect(getByText('Employment Type')).toBeInTheDocument();
    expect(getByText('SelectLocation')).toBeInTheDocument();
    expect(getByText('Notes')).toBeInTheDocument();
  });
});
