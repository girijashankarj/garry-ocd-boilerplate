import { sequelize } from '../../src/db/index.js';
import '../../src/models/user.js';

async function run() {
  await sequelize.sync({ alter: true });
  console.log('DB synced');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
