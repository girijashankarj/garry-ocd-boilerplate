import { parseCsvUsers, usersToCsv } from '../../../src/utils/csvUtils';
import type { User } from '../../../src/common/types';

test('csv utils parse and serialize', () => {
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
  const csv = usersToCsv(users);
  const parsed = parseCsvUsers(csv);
  expect(parsed).toHaveLength(1);
  expect(parsed[0].email).toBe('jane@test.com');
});
