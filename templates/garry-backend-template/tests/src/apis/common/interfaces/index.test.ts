import type { ApiResult } from '../../../../../src/apis/common/interfaces';

test('interfaces define ApiResult shape', () => {
  const res: ApiResult<{ id: number }> = { ok: true, data: { id: 1 } };
  expect(res.ok).toBe(true);
});
