import {
  apiCommon,
  apiHelpers,
  createApiRouter,
  createUser,
  deleteUser,
  getUser,
  updateUser,
  withWrap,
} from '../../../src/apis';

test('apis index exports', () => {
  expect(createApiRouter).toBeDefined();
  expect(withWrap).toBeDefined();
  expect(getUser).toBeDefined();
  expect(createUser).toBeDefined();
  expect(updateUser).toBeDefined();
  expect(deleteUser).toBeDefined();
  expect(apiCommon).toBeDefined();
  expect(apiHelpers).toBeDefined();
});
