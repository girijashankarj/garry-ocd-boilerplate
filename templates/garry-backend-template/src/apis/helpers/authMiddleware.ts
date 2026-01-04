import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ERROR_MESSAGES } from '../../common/messages/error';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const expected = process.env.API_TOKEN;
  if (!expected) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: ERROR_MESSAGES.UNAUTHORIZED });
  }

  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : header;
  if (!token || token !== expected) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: ERROR_MESSAGES.UNAUTHORIZED });
  }

  return next();
};
