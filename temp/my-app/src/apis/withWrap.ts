import type { NextFunction, Request, Response } from 'express';
import { ERROR_MESSAGES } from '../common/messages/error';
import { FILE_NAMES } from '../common/fileNames';
import { OPERATIONS } from '../common/operations';
import { loggerError } from '../utils/loggerUtils';

export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function withWrap(handler: AsyncHandler): AsyncHandler {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      loggerError(
        ERROR_MESSAGES.UNEXPECTED,
        err,
        OPERATIONS.HANDLER_WRAP,
        FILE_NAMES.API_WRAP,
        handler.name
      );
      if (res.headersSent) return;
      res.status(500).json({ error: 'server_error' });
    }
  };
}
