import type { Request, Response, NextFunction } from 'express';
import { withWrap } from '../../../src/apis/withWrap';

function mockRes() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    headersSent: false,
  } as unknown as Response;
}

test('withWrap calls handler', async () => {
  const handler = jest.fn(async (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({ ok: true });
  });
  const wrapped = withWrap(handler);
  const res = mockRes();
  await wrapped({} as Request, res, jest.fn());
  expect(handler).toHaveBeenCalled();
});

test('withWrap handles errors', async () => {
  const handler = jest.fn(async () => {
    throw new Error('boom');
  });
  const wrapped = withWrap(handler);
  const res = mockRes();
  await wrapped({} as Request, res, jest.fn());
  expect(res.status).toHaveBeenCalledWith(500);
});
