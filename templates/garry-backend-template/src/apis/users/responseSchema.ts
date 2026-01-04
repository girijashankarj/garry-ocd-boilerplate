import type { JSONSchemaType } from 'ajv';

export interface UserResponse {
  id: number;
  name: string;
  email: string;
}

export const userResponseSchema: JSONSchemaType<UserResponse> = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string' },
  },
  required: ['id', 'name', 'email'],
  additionalProperties: false,
};
