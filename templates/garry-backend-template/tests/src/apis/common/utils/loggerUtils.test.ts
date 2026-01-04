import { loggerInfo } from '../../../../../src/apis/common/utils/loggerUtils';

test('logger utils export loggerInfo', () => {
  expect(typeof loggerInfo).toBe('function');
});
