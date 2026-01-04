import type { JSONSchemaType } from 'ajv';

export interface CreateUserRequest {
  name: string;
  email: string;
}

export const createUserSchema: JSONSchemaType<CreateUserRequest> = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
  },
  required: ['name', 'email'],
  additionalProperties: false,
};
