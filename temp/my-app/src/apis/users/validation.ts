import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { createUserSchema, type CreateUserRequest } from './requestSchema';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validateCreate = ajv.compile(createUserSchema);

export function validateCreateUser(payload: unknown): CreateUserRequest {
  const valid = validateCreate(payload);
  if (!valid) {
    throw new Error('invalid_payload');
  }
  return payload as CreateUserRequest;
}
