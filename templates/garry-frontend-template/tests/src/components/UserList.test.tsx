import { render } from '@testing-library/react';
import UserList from '../../../src/components/UserList';
import type { User } from '../../../src/common/types';

test('UserList renders empty state', () => {
  const { getByText } = render(
    <UserList users={[]} onUpdate={() => {}} onDelete={() => {}} />
  );
  expect(getByText('No users yet.')).toBeInTheDocument();
});

test('UserList renders users', () => {
  const users: User[] = [
    {
      id: '1',
      name: 'Jane',
      email: 'jane@test.com',
      role: 'viewer',
      createdAt: 'now',
      updatedAt: 'now',
    },
  ];
  const { getByText } = render(
    <UserList users={users} onUpdate={() => {}} onDelete={() => {}} />
  );
  expect(getByText('Jane')).toBeInTheDocument();
});
