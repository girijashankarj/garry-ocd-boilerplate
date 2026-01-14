import type { Request, Response, NextFunction } from 'express';
import * as helpers from '../../../../src/apis/helpers';
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

  const tokenSpy = jest.spyOn(helpers, 'getApiToken').mockReturnValue(undefined);
  authMiddleware(req, res, next);
  tokenSpy.mockRestore();

  expect(status).toHaveBeenCalled();
  expect(next).not.toHaveBeenCalled();
});

test('authMiddleware blocks when token is invalid', () => {
  const req = { headers: { authorization: 'Bearer bad' } } as Request;
  const status = jest.fn(() => ({ json: jest.fn() }));
  const res = { status } as unknown as Response;
  const next = jest.fn() as NextFunction;

  const tokenSpy = jest.spyOn(helpers, 'getApiToken').mockReturnValue('good');
  authMiddleware(req, res, next);
  tokenSpy.mockRestore();

  expect(status).toHaveBeenCalled();
  expect(next).not.toHaveBeenCalled();
});

test('authMiddleware allows when token is valid', () => {
  const req = { headers: { authorization: 'Bearer good' } } as Request;
  const status = jest.fn(() => ({ json: jest.fn() }));
  const res = { status } as unknown as Response;
  const next = jest.fn() as NextFunction;

  const tokenSpy = jest.spyOn(helpers, 'getApiToken').mockReturnValue('good');
  authMiddleware(req, res, next);
  tokenSpy.mockRestore();

  expect(next).toHaveBeenCalled();
});
