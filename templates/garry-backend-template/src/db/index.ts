import { Sequelize } from 'sequelize';
import path from 'path';

const storage = process.env.NODE_ENV === 'test' ? ':memory:' : path.resolve(process.cwd(), 'database.sqlite');

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
  logging: false,
});

export async function connect() {
  await sequelize.authenticate();
  return sequelize;
}
