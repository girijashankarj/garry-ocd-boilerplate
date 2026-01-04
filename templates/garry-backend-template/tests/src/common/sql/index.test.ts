import { USER_QUERIES } from '../../../../src/common/sql';

test('USER_QUERIES exposes basic SQL strings', () => {
  expect(USER_QUERIES.SELECT_BY_ID).toContain('SELECT');
  expect(USER_QUERIES.INSERT).toContain('INSERT');
  expect(USER_QUERIES.UPDATE).toContain('UPDATE');
  expect(USER_QUERIES.DELETE).toContain('DELETE');
});
