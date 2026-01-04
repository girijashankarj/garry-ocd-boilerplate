# Security

Introduction
This document defines baseline security expectations for all generated projects. It is written for engineering, QA, and DevOps to align on how risk is reduced in day‑to‑day work.

## Contents
- Threat model
- Security controls
- Input validation rules
- Secrets handling
- Logging safety
- QA verification checklist
- DevOps verification checklist
- References
- Last updated

## Threat model
Primary risks
- Injection via unvalidated input
- Secret leakage through logs or JSON configs
- Misconfigured environments (wrong API endpoints or DB connection strings)

Impact
- Data exposure, integrity loss, service outages, compliance issues

## Security controls
Validation controls
- AJV validation required for all API input payloads.
- Business validation enforced in businessValidation.ts.

Configuration controls
- Environment mappings defined in JSON (env.json).
- Secrets stored only in environment variables.
- Config validation at startup/build.

Operational controls
- Strict CI checks for lint/test/test:structure.
- Branch/commit enforcement via hooks to prevent bypass.

## Input validation rules
- Reject invalid payloads with 400.
- No direct DB calls in validation layer.
- Use schema validation before business validation.

## Secrets handling
- Secrets only in environment variables.
- Never store secrets in JSON configs.
- Validate required env vars at startup; fail fast if missing.

## Logging safety
- Never log tokens or PII.
- Use message keys from src/common/messages.
- Log minimal payloads with safe fields only.

## QA verification checklist
- Validation errors return 400.
- Business rule errors return 400/409.
- Logs do not include PII or tokens.

## DevOps verification checklist
- Secrets injected via environment variables only.
- env.json mapping verified for deployment target.
- Logging output matches schema.

## References
- docs/logging.md
- docs/requirements/configuration.md
- docs/api/standards.md

Last updated: 2025-01-04
