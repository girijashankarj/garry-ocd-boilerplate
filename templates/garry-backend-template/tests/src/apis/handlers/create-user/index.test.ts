import type { NextFunction, Request, Response } from 'express';
import { jest } from '@jest/globals';

const mockValidateRequest = jest.fn() as jest.Mock;
const mockValidateResponse = jest.fn() as jest.Mock;
const mockBusinessValidation = jest.fn() as jest.Mock;
const mockPreOperation = jest.fn() as jest.Mock;
const mockDbOperation = jest.fn() as jest.Mock;
const mockPostOperation = jest.fn() as jest.Mock;
const mockLoggerInfo = jest.fn() as jest.Mock;
const mockLoggerError = jest.fn() as jest.Mock;

class MockValidationError extends Error {}

jest.unstable_mockModule('../../../../../src/apis/common/utils/validationUtils', () => ({
  ValidationError: MockValidationError,
  validateRequest: mockValidateRequest,
  validateResponse: mockValidateResponse,
}));

jest.unstable_mockModule('../../../../../src/apis/handlers/create-user/logic/businessValidation', () => ({
  businessValidation: mockBusinessValidation,
}));
jest.unstable_mockModule('../../../../../src/apis/handlers/create-user/logic/preOperation', () => ({
  preOperation: mockPreOperation,
}));
jest.unstable_mockModule('../../../../../src/apis/handlers/create-user/logic/dbOperation', () => ({
  dbOperation: mockDbOperation,
}));
jest.unstable_mockModule('../../../../../src/apis/handlers/create-user/logic/postOperation', () => ({
  postOperation: mockPostOperation,
}));
jest.unstable_mockModule('../../../../../src/apis/common/utils/loggerUtils', () => ({
  loggerInfo: mockLoggerInfo,
  loggerError: mockLoggerError,
}));

const loadHandler = async () => (await import('../../../../../src/apis/handlers/create-user')).default;

const createRes = (): Response =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }) as unknown as Response;

beforeEach(() => {
  jest.clearAllMocks();
});

test('create-user handler returns created payload', async () => {
  const handler = await loadHandler();
  const req = { body: { name: 'Ada', email: 'ada@example.com' } } as Request;
  const res = createRes();
  const next = jest.fn() as NextFunction;

  mockValidateRequest.mockReturnValue(req.body);
  mockBusinessValidation.mockReturnValue(true);
  mockPreOperation.mockResolvedValue(req.body);
  mockDbOperation.mockResolvedValue({ id: 1, name: 'Ada', email: 'ada@example.com' });
  mockPostOperation.mockResolvedValue({ id: 1, name: 'Ada', email: 'ada@example.com' });

  await handler(req, res, next);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({
    ok: true,
    data: { id: 1, name: 'Ada', email: 'ada@example.com' },
  });
});

test('create-user handler rejects invalid payload', async () => {
  const handler = await loadHandler();
  const req = { body: { name: '', email: 'bad' } } as Request;
  const res = createRes();
  const next = jest.fn() as NextFunction;

  mockValidateRequest.mockReturnValue(req.body);
  mockBusinessValidation.mockReturnValue(false);

  await handler(req, res, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'error.invalid_payload' });
});
