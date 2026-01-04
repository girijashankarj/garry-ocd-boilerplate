import { render, fireEvent } from '@testing-library/react';
import UserForm from '../../../src/components/UserForm';

test('UserForm submits input', () => {
  const onCreate = jest.fn();
  const { getByPlaceholderText, getByText } = render(<UserForm onCreate={onCreate} />);
  fireEvent.change(getByPlaceholderText('Jane Doe'), { target: { value: 'Jane' } });
  fireEvent.change(getByPlaceholderText('jane@email.com'), { target: { value: 'jane@email.com' } });
  fireEvent.click(getByText('Add user'));
  expect(onCreate).toHaveBeenCalled();
});
