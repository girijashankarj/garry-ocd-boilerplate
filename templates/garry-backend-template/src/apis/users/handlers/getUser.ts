import type { Request, Response } from 'express';
import { ERROR_MESSAGES } from '../../../common/messages/error';
import { INFO_MESSAGES } from '../../../common/messages/info';
import { FILE_NAMES } from '../../../common/fileNames';
import { OPERATIONS } from '../../../common/operations';
import { loggerInfo } from '../../../utils/loggerUtils';
import { withWrap } from '../../withWrap';
import { businessValidateCreate } from '../businessValidation';
import { createUserLogic, getUserById } from '../logic';
import { postCreate } from '../postOperation';
import { preCreate } from '../preOperation';
import { validateCreateUser } from '../validation';
import type { CreateUserRequest } from '../requestSchema';

export const getUser = withWrap(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await getUserById(id);
  if (!user) return res.status(404).json({ error: ERROR_MESSAGES.NOT_FOUND });
  loggerInfo(INFO_MESSAGES.REQUEST_OK, { id }, OPERATIONS.USERS_GET, FILE_NAMES.USERS_HANDLER, 'getUser');
  return res.json({ ok: true, data: user });
});

export const createUser = withWrap(async (req: Request, res: Response) => {
  let payload: CreateUserRequest;
  try {
    payload = validateCreateUser(req.body);
  } catch {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_PAYLOAD });
  }
  const ok = businessValidateCreate(payload);
  if (!ok) return res.status(400).json({ error: ERROR_MESSAGES.INVALID_PAYLOAD });

  const prepped = await preCreate(payload);
  const created = await createUserLogic(prepped);
  const result = await postCreate(created);
  loggerInfo(INFO_MESSAGES.REQUEST_OK, { id: result?.id }, OPERATIONS.USERS_CREATE, FILE_NAMES.USERS_HANDLER, 'createUser');
  return res.status(201).json({ ok: true, data: result });
});
