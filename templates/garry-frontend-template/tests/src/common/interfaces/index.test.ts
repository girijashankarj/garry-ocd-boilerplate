import type { ApiResult } from '../../../../src/common/interfaces';

test('interfaces compile', () => {
  const result: ApiResult<number> = { ok: true, data: 1 };
  expect(result.ok).toBe(true);
});
