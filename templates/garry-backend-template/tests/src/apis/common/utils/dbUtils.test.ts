import { isDbConnected } from '../../../../../src/apis/common/utils/dbUtils';
import { sequelize } from '../../../../../src/db/index';

beforeEach(() => {
  jest.restoreAllMocks();
});

test('isDbConnected returns true when authenticate succeeds', async () => {
  jest.spyOn(sequelize, 'authenticate').mockResolvedValue(undefined);
  await expect(isDbConnected()).resolves.toBe(true);
});

test('isDbConnected returns false when authenticate fails', async () => {
  jest.spyOn(sequelize, 'authenticate').mockRejectedValue(new Error('fail'));
  await expect(isDbConnected()).resolves.toBe(false);
});
