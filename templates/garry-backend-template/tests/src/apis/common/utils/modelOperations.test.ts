import {
  modelCreateUser,
  modelDeleteUser,
  modelGetUserById,
  modelUpdateUser,
} from '../../../../../src/apis/common/utils/modelOperations';

test('model operations exports are functions', () => {
  expect(typeof modelGetUserById).toBe('function');
  expect(typeof modelCreateUser).toBe('function');
  expect(typeof modelUpdateUser).toBe('function');
  expect(typeof modelDeleteUser).toBe('function');
});
