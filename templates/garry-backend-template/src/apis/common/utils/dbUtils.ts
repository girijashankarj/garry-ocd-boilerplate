import { sequelize } from '../../../db/index';

export const isDbConnected = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    return true;
  } catch {
    return false;
  }
};
