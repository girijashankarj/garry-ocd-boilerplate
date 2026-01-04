import { sequelize } from '../../../src/db/index';

test('sequelize is defined', () => {
  expect(sequelize).toBeDefined();
});
