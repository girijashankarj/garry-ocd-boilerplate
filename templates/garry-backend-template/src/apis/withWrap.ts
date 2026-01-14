import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ERROR_MESSAGES } from '../common/messages/error';
import { FILE_NAMES } from '../common/fileNames';
import { OPERATIONS } from '../common/operations';
import { loggerError } from './common/utils/loggerUtils';

export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

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
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'server_error' });
    }
  };
}
