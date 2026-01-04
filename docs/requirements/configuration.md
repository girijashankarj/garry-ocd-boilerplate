# Configuration

Introduction
This document defines how configuration is stored, validated, and consumed across generated projects.

## Contents
- Purpose
- Required files
- Source priority
- Validation rules
- ASCII load flow
- References
- Last updated

## Purpose
- Centralize theme, client data, and environment mapping.
- Prevent inline config drift across code files.

## Required files
- config/theme.json
- config/client.json
- config/env.json

## Source priority
1. Environment variables
2. JSON config files
3. Code defaults (documented only)

## Validation rules
- Fail fast if required keys are missing.
- No secrets in JSON; use environment variables.
- Validate config structure at startup/build.

## Example configs (canonical)
theme.json
```
{
  "mode": "dark",
  "colors": {
    "primary": "#0ea5e9",
    "background": "#0b0b0b",
    "text": "#f8fafc"
  },
  "borderRadius": 8
}
```

client.json
```
{
  "name": "Garry Client",
  "domain": "example.com",
  "supportEmail": "support@example.com",
  "locale": "en-US"
}
```

env.json
```
{
  "API_BASE_URL": "VITE_API_BASE_URL",
  "LOG_LEVEL": "VITE_LOG_LEVEL"
}
```

Backend env.json example
```
{
  "PORT": "PORT",
  "DATABASE_URL": "DATABASE_URL",
  "LOG_LEVEL": "LOG_LEVEL"
}
```

## Required keys (baseline)
Theme
- mode
- colors.primary
- colors.background
- colors.text

Client
- name
- domain
- supportEmail
- locale

Environment mapping
- Keys are internal names, values are env var names.
- No secrets stored in JSON values.

## ASCII load flow
```
[env vars] ----->|
[config/*.json]->|--> [config loader] -> [validated config] -> [app]
[defaults] ----->|
```

## References
- docs/architecture/security.md
- docs/logging.md

Last updated: 2025-01-04
