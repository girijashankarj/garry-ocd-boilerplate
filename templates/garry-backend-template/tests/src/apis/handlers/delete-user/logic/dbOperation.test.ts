import { dbOperation } from '../../../../../../src/apis/handlers/delete-user/logic/dbOperation';

test('dbOperation is a function', () => {
  expect(typeof dbOperation).toBe('function');
});
