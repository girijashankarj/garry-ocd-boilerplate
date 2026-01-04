import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { ERROR_MESSAGES } from './common/messages/error';
import { INFO_MESSAGES } from './common/messages/info';
import { FILE_NAMES } from './common/fileNames';
import { OPERATIONS } from './common/operations';
import { loggerError, loggerInfo, loggerWarn } from './utils/loggerUtils';
import usersApi from './apis/users/index.js';
const app = express();

app.use(express.json());
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Swagger UI
try {
  const openapiPath = path.join(__dirname, 'openapi', 'openapi.yaml');
  const spec = YAML.load(openapiPath);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
} catch (err) {
  loggerWarn(ERROR_MESSAGES.UNEXPECTED, err, OPERATIONS.SERVER_START, FILE_NAMES.SERVER, 'swagger');
}

// Mount example users API (follows the /src/apis/* pattern)
app.use('/api/users', usersApi);

import { sequelize } from './db/index.js';
import './models/user.js';

const port = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.sync();
    app.listen(port, () =>
      loggerInfo(INFO_MESSAGES.APP_STARTED, { port }, OPERATIONS.SERVER_START, FILE_NAMES.SERVER, 'start')
    );
  } catch (err) {
    loggerError(ERROR_MESSAGES.DB, err, OPERATIONS.SERVER_START, FILE_NAMES.SERVER, 'start');
    process.exit(1);
  }
}

start();
