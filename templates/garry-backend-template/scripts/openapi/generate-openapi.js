import fs from 'fs';
import path from 'path';
import YAML from 'yamljs';

const root = process.cwd();
const handlersRoot = path.join(root, 'src', 'apis', 'handlers');
const outputPath = path.join(root, 'src', 'openapi', 'openapi.yaml');

const toPascalCase = (value) =>
  value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const loadSchema = (handlerName, file) => {
  const schemaPath = path.join(handlersRoot, handlerName, 'schema', file);
  return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
};

const handlers = [
  { name: 'get-user', method: 'get', path: '/users/{id}', requestBody: false, status: '200' },
  { name: 'create-user', method: 'post', path: '/users', requestBody: true, status: '201' },
  { name: 'update-user', method: 'put', path: '/users/{id}', requestBody: true, status: '200' },
  { name: 'delete-user', method: 'delete', path: '/users/{id}', requestBody: false, status: '200' },
];

const components = { schemas: {} };
const paths = {};

for (const handler of handlers) {
  const key = toPascalCase(handler.name);
  const requestSchema = loadSchema(handler.name, 'requestSchema.json');
  const responseSchema = loadSchema(handler.name, 'responseSchema.json');
  const errorSchema = loadSchema(handler.name, 'errorSchema.json');

  components.schemas[`${key}Request`] = requestSchema;
  components.schemas[`${key}Response`] = responseSchema;
  components.schemas[`${key}Error`] = errorSchema;

  if (!paths[handler.path]) paths[handler.path] = {};

  const operation = {
    summary: `${key} handler`,
    responses: {
      [handler.status]: {
        description: 'Success',
        content: {
          'application/json': {
            schema: { $ref: `#/components/schemas/${key}Response` },
          },
        },
      },
      '400': {
        description: 'Bad request',
        content: {
          'application/json': {
            schema: { $ref: `#/components/schemas/${key}Error` },
          },
        },
      },
    },
  };

  if (handler.requestBody) {
    operation.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: `#/components/schemas/${key}Request` },
        },
      },
    };
  } else {
    operation.parameters = [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      },
    ];
  }

  paths[handler.path][handler.method] = operation;
}

const doc = {
  openapi: '3.0.0',
  info: { title: 'Generated API', version: '0.1.0' },
  paths,
  components,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
const yaml = YAML.stringify(doc, 2, 2);
fs.writeFileSync(outputPath, yaml, 'utf8');
console.log(`OpenAPI written to ${outputPath}`);
