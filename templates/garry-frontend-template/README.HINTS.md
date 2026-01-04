Notes for generated projects:

- Favicon: default is provided using `public/favicon.svg`. Replace with your preferred SVG/JPG assets.
- Icons: Font Awesome CDN link is included in `index.html` by default.
- Changesets: This template requires a changeset file to be staged for every commit. Use `npx changeset` to create one.
- Husky: Run `npm run prepare` after `npm install` to enable git hooks.
- TypeScript is mandatory in this template.
- Branch names are validated in pre-commit: main, qa, develop, feature/_, fix/_, hotfix/\*, release/DD-MM-YYYY.
- Project structure: a `src/common` folder exists with `enums`, `types`, `constants`, `interfaces`, and `utils` for shared utilities and types.
- Config: `config/theme.json`, `config/client.json`, `config/env.json` are required and must not contain secrets.
- CI: `.github/workflows/pr-check.yml` runs lint, format check, test structure, tests, and build on PRs.
- API patterns: For apps that include APIs, follow `src/apis/<resource>/{handlers,requestSchema,responseSchema,logic,preOperation,postOperation,validation,businessValidation,sql}` as a recommended pattern.
- Tests: every `src` code file should have a matching test file under `tests/src` with the same path (e.g. `src/App.tsx` -> `tests/src/App.test.tsx`). Run `npm run test:structure` to validate.
- Docs: All documentation is consolidated in `docs/PROJECT-DOCS.md`.
- Auto-install / presets: When generating with `--yes`, the CLI will run the detected package manager to install dependencies (use `--dry-run` to skip install for CI). Use `--preset frontend-full` to get a TS + Tailwind + Redux + Lottie starter.
