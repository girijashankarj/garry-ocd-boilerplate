Notes for generated backend projects:

- Swagger: add OpenAPI spec in `src/openapi` and expose Swagger UI at `/docs` for Express by default.
- Linting & formatting: ESLint and Prettier are configured; run `npm run lint` and `npm run format`.
- Tests: Jest is configured with ts-jest and a 70% coverage threshold.
- TypeScript is mandatory in this template.
- Branch names are validated in pre-commit: main, qa, develop, feature/_, fix/_, hotfix/\*, release/DD-MM-YYYY.
- Test structure: every `src` code file should have a matching test file under `tests/src` with the same path (e.g. `src/apis/users/logic.ts` -> `tests/src/apis/users/logic.test.ts`). Run `npm run test:structure` to validate.
- CI: `.github/workflows/pr-check.yml` runs lint, format check, test structure, and tests on PRs.
- Changesets: This template requires a changeset file to be staged for every commit. Use `npx changeset` to create one.
- Husky: Run `npm run prepare` after `npm install` to enable git hooks.
- Auto-install / presets: When generating with `--yes`, the CLI will run the detected package manager to install dependencies (use `--dry-run` to skip install for CI). Use `--preset backend-db` to scaffold TS + Sequelize DB support automatically.
- Database: A simple SQLite + Sequelize example is included. Use `npm run db:sync` to apply models and `npm run db:seed` to add example data. For CI/tests the DB uses in-memory SQLite.
- Project structure: a `src/common` folder exists with `enums`, `types`, `constants`, `interfaces`, and `utils` for shared utilities and types.
- Config: `config/theme.json`, `config/client.json`, `config/env.json` are required and must not contain secrets.
- API pattern: for resource APIs follow `src/apis/<resource>/{handlers,requestSchema,responseSchema,logic,preOperation,postOperation,validation,businessValidation,sql}` — an example `users` API is scaffolded at `src/apis/users`.
- Docs: All documentation is consolidated in `docs/PROJECT-DOCS.md`.
- Badge injection: `scripts/inject-badge.js` can inject CI badge(s) into `README.md` with `node scripts/inject-badge.js --repo owner/repo --badge <name>`.
