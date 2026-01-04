import express from 'express';
import { createUser, getUser } from './handlers';

const router = express.Router();

router.get('/:id', getUser);
router.post('/', createUser);

export default router;

export * from './businessValidation';
export * from './handlers';
export * from './logic';
export * from './postOperation';
export * from './preOperation';
export * from './requestSchema';
export * from './responseSchema';
export * from './validation';
