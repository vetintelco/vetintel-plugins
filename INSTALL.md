# Internal staging installation

Release 0.1.0 is **Staging · Read-only**. Do not distribute until the API/MCP stack has merged and
deployed to staging, readiness passes, and the staging pilot organization is enabled.

## Prerequisites

- Read access to this private repository; no application-repository access is needed.
- An authenticated Git installation that can clone this repository. Never put a GitHub token in a URL.
- A current Codex client, an approved staging account, and membership in the enabled pilot organization.
- An OpenAI account approved for company information. Returned data is handled under that account's settings.

## Codex

Register the marketplace once:

```bash
codex plugin marketplace add vetintelco/vetintel-plugins --ref main
```

Open [Install Veterinary Intelligence](codex://plugins/install/vetintel?marketplace=vetintel-internal).
The link requires marketplace registration first. Alternatively open Plugins in Codex desktop,
or enter `/plugins` in Codex CLI. Choose **Veterinary Intelligence — Internal**, then install
**Veterinary Intelligence (Test)**. Approve installation, sign in, choose the eligible staging
organization, and approve the requested read permissions. Start a new session and request a list
of available saved reports.

No `codex mcp add`, API key, or DCR override should be necessary. If registration or sign-in fails,
report the client version and sanitized error to the operator; never paste tokens or authorization URLs.

## ChatGPT (separate connection)

Your account must allow developer mode. In Settings → Security and login, enable Developer mode.
Open Plugins, select the plus button, name the connection **Veterinary Intelligence (Staging)**,
select OAuth, and enter:

```text
https://api.staging.vetintelcompany.com/v0/mcp
```

Review the discovered tools, sign in, choose your staging organization, and approve access. Start a
new conversation with the connector selected. Codex marketplace installation does not distribute
or synchronize this connector across personal ChatGPT accounts.

## Seven read-only tools

| Tool | Capability |
| --- | --- |
| search | Search entity names or saved-report titles |
| fetch | Read an entity profile, facts, relationships, or a report by typed reference |
| describe_dataset | Inspect entitled logical views, columns, and relationships |
| query_dataset | Run bounded SELECT-only queries over entitled views |
| list_reports | List and search organization-visible reports |
| get_report | Read report definitions and section identifiers |
| run_report | Execute selected saved-report sections |

## Update, reconnect, or remove

Run `codex plugin marketplace upgrade vetintel-internal`, review the release notes, and use the
plugin browser to update/reinstall if needed. Start a new session and confirm the advertised environment.
Do not assume cached plugin packages update automatically.

Use **Connected Apps → Disconnect** in the Veterinary Intelligence Company web app to revoke the
server grant. Removing GitHub access or uninstalling the package alone does not revoke OAuth access.
Remove the plugin through its browser separately. After a staging reset, repeat connection setup
with fresh consent. Preserve unrelated local connections.

Production migration requires an explicit release and fresh production OAuth consent; staging
credentials cannot be transferred. See [promotion gates](PROMOTION.md).
