import * as utils from '../../../src/utils';

test('utils index exports', () => {
  expect(utils.loggerInfo).toBeDefined();
  expect(utils.lodashUtils).toBeDefined();
});
