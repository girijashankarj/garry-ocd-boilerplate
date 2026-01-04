import type { JSONSchemaType } from 'ajv';
import { ValidationError, validateRequest } from '../../../../../src/apis/common/utils/validationUtils';

type Sample = { name: string };

const schema: JSONSchemaType<Sample> = {
  type: 'object',
  properties: { name: { type: 'string', minLength: 1 } },
  required: ['name'],
  additionalProperties: false,
};

test('validateRequest returns payload when valid', () => {
  const res = validateRequest(schema, { name: 'ok' });
  expect(res.name).toBe('ok');
});

test('validateRequest throws ValidationError when invalid', () => {
  expect(() => validateRequest(schema, { name: '' })).toThrow(ValidationError);
});
