import { UserRole } from '../../../../../src/apis/common/enums';

test('enums export UserRole', () => {
  expect(UserRole.ADMIN).toBe('admin');
});
