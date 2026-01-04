import { GET_USER_BY_ID, INSERT_USER } from '../../../../src/apis/users/sql';

test('sql strings are defined', () => {
  expect(GET_USER_BY_ID).toContain('SELECT');
  expect(INSERT_USER).toContain('INSERT');
});
