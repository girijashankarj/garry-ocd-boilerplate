import { type IdParam } from '../../../../../src/apis/common/types';

test('types export IdParam shape', () => {
  const sample: IdParam = { id: '1' };
  expect(sample.id).toBe('1');
});
