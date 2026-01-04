import type { Request, Response, NextFunction } from 'express';
import { asNumber, authMiddleware } from '../../../../src/apis/helpers';

test('asNumber returns number or null', () => {
  expect(asNumber('1')).toBe(1);
  expect(asNumber(2)).toBe(2);
  expect(asNumber('bad')).toBeNull();
});

test('authMiddleware blocks when API_TOKEN is missing', () => {
  const req = { headers: {} } as Request;
  const status = jest.fn(() => ({ json: jest.fn() }));
  const res = { status } as unknown as Response;
  const next = jest.fn() as NextFunction;

  const previous = process.env.API_TOKEN;
  delete process.env.API_TOKEN;
  authMiddleware(req, res, next);
  process.env.API_TOKEN = previous;

  expect(status).toHaveBeenCalled();
  expect(next).not.toHaveBeenCalled();
});
