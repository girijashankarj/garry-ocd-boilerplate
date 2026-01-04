import { render } from '@testing-library/react';
import UserDashboard from '../../../src/components/UserDashboard';

jest.mock('../../../src/hooks/useUsers', () => ({
  useUsers: () => ({
    users: [],
    loading: false,
    error: null,
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  }),
}));

test('UserDashboard renders header', () => {
  const { getByText } = render(<UserDashboard />);
  expect(getByText('Garry Users Portal')).toBeInTheDocument();
});
