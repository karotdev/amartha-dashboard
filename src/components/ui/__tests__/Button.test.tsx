import { PlusIcon } from 'lucide-react';
import { render } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('should render with children', () => {
    const { getByText } = render(
      <Button>
        <PlusIcon />
        Add Employee
      </Button>,
    );
    expect(getByText('Add Employee')).toBeInTheDocument();
  });
});
