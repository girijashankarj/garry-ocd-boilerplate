import { dbOperation } from '../../../../../../src/apis/handlers/update-user/logic/dbOperation';

test('dbOperation is a function', () => {
  expect(typeof dbOperation).toBe('function');
});
