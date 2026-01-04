import type { ApiResult } from '../../../../src/common/interfaces';

test('interfaces compile', () => {
  const result: ApiResult<string> = { ok: true, data: 'ok' };
  expect(result.ok).toBe(true);
});
