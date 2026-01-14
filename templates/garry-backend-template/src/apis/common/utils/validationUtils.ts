/* eslint-disable immutable/no-mutation */
import Ajv, { type JSONSchemaType, type Options, type ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';

type AjvLike = {
  compile: <T>(schema: JSONSchemaType<T>) => ValidateFunction<T>;
};

const AjvCtor = Ajv as unknown as new (options: Options) => AjvLike;
const addFormatsFn = addFormats as unknown as (instance: AjvLike) => void;
const ajv = new AjvCtor({ allErrors: true });
addFormatsFn(ajv);

export class ValidationError extends Error {
  public readonly details: unknown;
  public readonly code: string;

  constructor(message: string, details?: unknown, code = 'validation_error') {
    super(message);
    this.details = details;
    this.code = code;
  }
}

export const validateRequest = <T>(schema: JSONSchemaType<T>, payload: unknown): T => {
  const validate = ajv.compile(schema);
  const valid = validate(payload);
  if (!valid) {
    throw new ValidationError('invalid_request', validate.errors);
  }
  return payload as T;
};

export const validateResponse = <T>(schema: JSONSchemaType<T>, payload: unknown): T => {
  const validate = ajv.compile(schema);
  const valid = validate(payload);
  if (!valid) {
    throw new ValidationError('invalid_response', validate.errors);
  }
  return payload as T;
};
