import { API_PREFIX, API_VERSION } from '../../../../src/apis/common';

test('api common exports', () => {
  expect(API_VERSION).toBe('v1');
  expect(API_PREFIX).toBe('/api');
});
