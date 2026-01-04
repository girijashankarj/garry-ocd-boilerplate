import { SQL } from '../../../../src/apis/common/sql';

test('sql constants are defined', () => {
  expect(SQL.GET_USER_BY_ID).toContain('SELECT');
  expect(SQL.CREATE_USER).toContain('INSERT');
});
