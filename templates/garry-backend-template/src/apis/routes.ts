import { Router } from 'express';
import { authMiddleware } from './helpers';
import createUser from './handlers/create-user';
import deleteUser from './handlers/delete-user';
import getUser from './handlers/get-user';
import updateUser from './handlers/update-user';

export const createApiRouter = (): Router => {
  const router = Router();
  router.use(authMiddleware);
  router.get('/users/:id', getUser);
  router.post('/users', createUser);
  router.put('/users/:id', updateUser);
  router.delete('/users/:id', deleteUser);
  return router;
};
