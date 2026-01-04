import { API_PREFIX, API_VERSION } from '../../../../../src/apis/common/constants';

test('constants export api prefix and version', () => {
  expect(API_PREFIX).toBe('/api');
  expect(API_VERSION).toBe('v1');
});
