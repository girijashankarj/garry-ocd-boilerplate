# Logging

Introduction
This document defines the logging standard for all generated projects. It ensures logs are structured, searchable, and safe for production use.

## Contents
- Purpose
- Scope
- Required schema
- Message taxonomy
- Usage rules
- ASCII flow diagram
- QA/DevOps checks
- References
- Last updated

## Purpose
- Provide consistent diagnostics across frontend and backend.
- Support incident triage, audits, and regression analysis.

## Scope
- Applies to UI, API handlers, utilities, DB, and background jobs.

## Required schema
Required fields for every log entry:
- level: info | warn | error | debug
- message: stable message key
- context: module or feature name
- fileName: source file path
- functionName: function or handler name
- payload: safe, minimal structured data

Recommended fields:
- operation (from src/common/operations)
- requestId (if available)
- durationMs

## Message taxonomy
- INFO_MESSAGES: startup, success, completion
- WARN_MESSAGES: deprecated paths, soft failures
- ERROR_MESSAGES: validation errors, DB failures, unexpected errors
- DEBUG_MESSAGES: state snapshots, performance tracing

## Usage rules
- Use logger utils only; avoid console.log in production.
- Do not log secrets, tokens, or PII.
- Keep payloads minimal and safe.
- Use message keys defined in src/common/messages.

## ASCII flow diagram
```
[Action] -> [Logger Utils] -> [Structured Log] -> [Sink]
     |            |                |                |
     |            |                +-> JSON output  +-> Console/Collector
     |            +-> adds context/operation
     +-> message key + payload
```

## QA/DevOps checks
- QA verifies error paths log correct message keys.
- DevOps verifies log schema in production pipelines.

## References
- docs/architecture/data-flow.md
- docs/workflows/ci.md

Last updated: 2025-01-04
