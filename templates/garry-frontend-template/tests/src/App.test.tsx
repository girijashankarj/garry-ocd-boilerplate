import { render } from '@testing-library/react';
import App from '../../src/App';

jest.mock('../../src/components/LottieExample', () => () => <div>lottie</div>);

jest.mock('../../src/hooks/useUsers', () => ({
  useUsers: () => ({
    users: [],
    loading: false,
    error: null,
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  }),
}));

test('App renders user portal title', () => {
  const { getByText } = render(<App />);
  expect(getByText('Garry Users Portal')).toBeInTheDocument();
});
