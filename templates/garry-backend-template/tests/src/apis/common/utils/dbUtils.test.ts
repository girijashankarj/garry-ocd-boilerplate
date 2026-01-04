import { isDbConnected } from '../../../../../src/apis/common/utils/dbUtils';

test('db utils export isDbConnected', () => {
  expect(typeof isDbConnected).toBe('function');
});
