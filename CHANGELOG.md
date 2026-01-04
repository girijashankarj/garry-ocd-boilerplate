# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Sequelize (SQLite) example for `garry-backend-template` with `db:sync` and `db:seed` scripts and example `User` model.
- `--db sequelize` flag to enable DB scaffolding for backend templates.
- Preset support (`--preset`) with `frontend-full` and `backend-db`.
- Auto-install support (`--yes`) with package manager detection and a `--dry-run` mode to skip install during CI.
- CI: generate-and-test matrix updated to run `db:sync`/`db:seed` for backend template during PR checks.

### Changed
- CLI: `--non-interactive` flow now honors presets passed via `--preset`.
