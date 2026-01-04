import { UserRole } from '../../../../src/common/enums';

test('UserRole enum is defined', () => {
  expect(UserRole.ADMIN).toBe('admin');
});
