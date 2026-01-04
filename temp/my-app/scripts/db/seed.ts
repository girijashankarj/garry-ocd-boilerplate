import { sequelize } from '../../src/db/index.js';
import { User } from '../../src/models/user.js';

async function seed() {
  await sequelize.sync({ alter: true });
  await User.create({ name: 'Seed User', email: 'seed@example.com' });
  console.log('DB seeded');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
