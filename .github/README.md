# Repository automation & secrets

This repository contains automation for CI, publishing, notifications, and security scanning.

Slack mapping
- File: `.github/slack_user_map.json` — map GitHub usernames to Slack IDs for mentions.
  Example:

```json
{
  "github_username_to_slack_id": {
    "octocat": "U12345678"
  }
}
```

Workflows use the mapping to mention the PR author in Slack when available.
