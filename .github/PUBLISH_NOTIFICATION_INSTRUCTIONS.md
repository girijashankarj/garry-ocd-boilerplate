# Publish Notification — Setup

This workflow (`.github/workflows/notify-publish.yml`) notifies Slack/Teams/WhatsApp when the root package is published.

How it triggers:
- When a GitHub `release` is published (event `release` with type `published`).
- When a `repository_dispatch` event of type `npm-published` is sent to the repo. This is useful when publishing to an external registry (Artifactory/Nexus) — call the dispatch from your publish pipeline after successful publish.

Example: trigger a repository_dispatch from your publish script or CI after successful publish:

```bash
curl -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  https://api.github.com/repos/<owner>/<repo>/dispatches \
  -d '{"event_type":"npm-published","client_payload": {"package_name":"my-package","version":"1.2.3","url":"https://your-registry/path","published_by":"ci-user"}}'
```

Secrets required in the repository settings:
- `SLACK_WEBHOOK` — incoming webhook URL for Slack
- `TEAMS_WEBHOOK` — incoming webhook URL for Microsoft Teams
- `WHATSAPP_WEBHOOK` — webhook URL for WhatsApp provider (e.g., Twilio)

Notes:
- If you publish via GitHub Actions, you can also create a GitHub release and the workflow will trigger automatically on `release.published`.
- Customize the message formatting in `.github/workflows/notify-publish.yml` as needed.
