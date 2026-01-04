# Node Express TypeScript template

This starter scaffold includes Express, TypeScript, and samples for logging and tests.

Setup

1. npm install
2. npm run prepare  # enable Husky hooks
3. npm run dev

Scripts

- `dev` — run dev server (nodemon + ts-node)
- `build` — compile TypeScript
- `lint` — run ESLint (errors on warnings)
- `format` — run Prettier
- `format:check` — verify formatting
- `test` — run Jest with coverage
- `test:structure` — ensure `tests/src` mirrors `src`
- `db:sync` — apply Sequelize models
- `db:seed` — seed sample data

Folder structure

- `docs/PROJECT-DOCS.md` — single, detailed technical documentation file for the project.
- `config/` — theme, client, and env JSON configs (no secrets).
- `src/common/` — enums, types, constants, interfaces, messages, file names, operations.
- `src/utils/` — shared utilities (logger and lodash wrappers).
- `src/apis/` — API modules using the handlers/logic/validation pattern and `withWrap`.
- `src/db/` — Sequelize connection.
- `src/models/` — Sequelize models.
- `tests/src/` — mirrors `src` with matching `*.test.ts` files.
- `tests/mock/` — test-only mock data and factories.

Dependencies (what they are for)

- `express` — HTTP server
- `ajv`, `ajv-formats` — request/response validation
- `sequelize`, `sqlite3` — ORM and local DB
- `swagger-ui-express`, `yamljs` — Swagger UI + OpenAPI spec loading
- `lodash` — shared utility functions (centralized in `src/utils/lodashUtils.ts`)
- `winston` — structured logging utility

Notes

- Add your OpenAPI spec to `src/openapi/` and the scaffold exposes Swagger UI at `/docs` by default (template stub to be implemented).
- Changesets are required on commits. Use `npx changeset` to create and stage a changeset before committing.
- For configuration details and workflow expectations, read `docs/PROJECT-DOCS.md`.
