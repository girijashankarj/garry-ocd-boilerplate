import usersReducer, { addUser } from '../../../src/store/usersSlice';
import type { User } from '../../../src/common/types';

test('users slice reducer adds user', () => {
  const user: User = {
    id: '1',
    name: 'Jane',
    email: 'jane@test.com',
    role: 'viewer',
    createdAt: 'now',
    updatedAt: 'now',
  };
  const state = usersReducer({ items: [] }, addUser(user));
  expect(state.items).toHaveLength(1);
});
