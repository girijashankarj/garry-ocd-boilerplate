import { FILE_NAMES } from '../../../src/common/fileNames';

test('file names are defined', () => {
  expect(FILE_NAMES.APP).toContain('App');
});
