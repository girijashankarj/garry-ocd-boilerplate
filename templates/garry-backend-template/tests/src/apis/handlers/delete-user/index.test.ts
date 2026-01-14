import type { Request, Response } from 'express';
import { jest } from '@jest/globals';

const mockValidateRequest = jest.fn();
const mockValidateResponse = jest.fn();
const mockBusinessValidation = jest.fn();
const mockPreOperation = jest.fn();
const mockDbOperation = jest.fn();
const mockPostOperation = jest.fn();
const mockLoggerInfo = jest.fn();
const mockLoggerError = jest.fn();

class MockValidationError extends Error {}

jest.unstable_mockModule('../../../../../src/apis/common/utils/validationUtils', () => ({
  ValidationError: MockValidationError,
  validateRequest: mockValidateRequest,
  validateResponse: mockValidateResponse,
}));

jest.unstable_mockModule('../../../../../src/apis/handlers/delete-user/logic/businessValidation', () => ({
  businessValidation: mockBusinessValidation,
}));
jest.unstable_mockModule('../../../../../src/apis/handlers/delete-user/logic/preOperation', () => ({
  preOperation: mockPreOperation,
}));
jest.unstable_mockModule('../../../../../src/apis/handlers/delete-user/logic/dbOperation', () => ({
  dbOperation: mockDbOperation,
}));
jest.unstable_mockModule('../../../../../src/apis/handlers/delete-user/logic/postOperation', () => ({
  postOperation: mockPostOperation,
}));
jest.unstable_mockModule('../../../../../src/apis/common/utils/loggerUtils', () => ({
  loggerInfo: mockLoggerInfo,
  loggerError: mockLoggerError,
}));

const loadHandler = async () => (await import('../../../../../src/apis/handlers/delete-user')).default;

const createRes = (): Response =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }) as unknown as Response;

beforeEach(() => {
  jest.clearAllMocks();
});

test('delete-user handler deletes user', async () => {
  const handler = await loadHandler();
  const req = { params: { id: '1' } } as unknown as Request;
  const res = createRes();

  mockValidateRequest.mockReturnValue({ id: '1' });
  mockBusinessValidation.mockReturnValue(true);
  mockPreOperation.mockResolvedValue({ id: '1' });
  mockDbOperation.mockResolvedValue({ id: '1' });
  mockPostOperation.mockResolvedValue({ id: '1' });

  await handler(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ ok: true, data: { id: '1' } });
});

test('delete-user handler returns 404 when missing', async () => {
  const handler = await loadHandler();
  const req = { params: { id: '404' } } as unknown as Request;
  const res = createRes();

  mockValidateRequest.mockReturnValue({ id: '404' });
  mockBusinessValidation.mockReturnValue(true);
  mockPreOperation.mockResolvedValue({ id: '404' });
  mockDbOperation.mockResolvedValue(null);

  await handler(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ error: 'error.not_found' });
});
