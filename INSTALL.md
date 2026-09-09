# Internal production installation

Release 0.2.0 on `main` is **Production · Read-only**. Only **Vetintel Admin Organization** is
authorized for the production pilot. A public marketplace does not enable customer access.

## Prerequisites

- A Git installation that can clone this public repository; no GitHub access grant or application-repository access is needed.
- Never put a GitHub token or API credential in a URL.
- A current Codex client, an approved production account, and membership in the enabled pilot organization.
- An OpenAI account approved for company information. Returned data is handled under that account's settings.

## ChatGPT desktop and Codex — public marketplace, internal data access

Verify the installed package is version **0.2.0** with the production endpoint.

Register the marketplace once:

```bash
codex plugin marketplace add vetintelco/vetintel-plugins --ref main
```

Restart the ChatGPT desktop app, then open **Plugins** and select the **Veterinary Intelligence —
Internal** marketplace. Install **Veterinary Intelligence**, version **0.2.0**, labeled
**Production · Read-only**. Alternatively, use
[Install Veterinary Intelligence](codex://plugins/install/vetintel?marketplace=vetintel-internal)
after registration, or enter `/plugins` in Codex CLI.

Sign in with your own approved production account, choose **Vetintel Admin Organization**, and
approve the requested read permissions. Start a new session and request a list
of available saved reports. Explicitly select the plugin (`$vetintel` in the tested CLI) to avoid
confusing it with unrelated local MCP aliases. Confirm its endpoint is
`https://api.vetintelcompany.com/v0/mcp` before querying.

No `codex mcp add`, API key, or DCR override should be necessary. If registration or sign-in fails,
report the client version and sanitized error to the operator; never paste tokens or authorization URLs.

This repo-backed MCP package is for desktop use; registering it locally does not install a connector
into ChatGPT web or other users' accounts. See the official
[marketplace setup guide](https://developers.openai.com/plugins/build/plugins).

## Shared ChatGPT workspace marketplace

For workspaces with marketplace-import controls, a workspace administrator:

1. Opens **Admin → Plugins → Add → Import marketplace**.
2. Sets Source to `https://github.com/vetintelco/vetintel-plugins`, leaves Path empty, and selects
   branch `main`. Do not enter the manifest filename in Path.
3. Authorizes GitHub read access, checks the import results, and configures member availability
   and authentication on install. GitHub import does not apply this repository's policy settings.
4. Members install from their workspace's Plugins tab and complete their own production OAuth.

Use **Sync now** for subsequent approved updates. Because this package contains `.mcp.json`,
the imported plugin is **Desktop only**, including its remote HTTPS tools. For ChatGPT web use the
separate connection below. See [workspace import documentation](https://learn.chatgpt.com/docs/enterprise/plugin-management).

## ChatGPT web — separate MCP connection

Your account must allow developer mode. In Settings → Security and login, enable Developer mode.
Open Plugins, select the plus button, name the connection **Veterinary Intelligence (Production)**,
select OAuth, and enter:

```text
https://api.vetintelcompany.com/v0/mcp
```

Review the discovered tools, sign in, choose your production organization, and approve access. Start a
new conversation with the connector selected. Select **Vetintel Admin Organization** during consent.
Local marketplace installation does not distribute or synchronize this connection across personal
ChatGPT accounts. See [official connection instructions](https://developers.openai.com/plugins/deploy/connect-chatgpt).

## Eight read-only tools

| Tool | Capability |
| --- | --- |
| search | Search entity names or saved-report titles |
| fetch | Read an entity profile, facts, relationships, or a report by typed reference |
| describe_dataset | Inspect entitled logical views, columns, and relationships |
| describe_ontology | Inspect governed attribute and relationship definitions at the authorized boundary |
| query_dataset | Run bounded SELECT-only queries over entitled views |
| list_reports | List and search organization-visible reports |
| get_report | Read report definitions and section identifiers |
| run_report | Execute selected saved-report sections |

## Update, reconnect, or remove

Run `codex plugin marketplace upgrade vetintel-internal`, review the release notes, and use the
plugin browser to update/reinstall if needed. Start a new session and confirm the advertised environment.
Do not assume cached plugin packages update automatically. Version 0.2.0 requires fresh production
OAuth consent; tokens and grants from the staging 0.1.0 pilot cannot be transferred. Verify a new
production connection before disconnecting the old staging one. Operators revoke only superseded
pilot grants after successful migration; unrelated local and staging connections stay untouched.

Use **Connected Apps → Disconnect** in the Veterinary Intelligence Company web app to revoke the
server grant. Removing GitHub access or uninstalling the package alone does not revoke OAuth access.
Remove the plugin through its browser separately. After a staging reset, repeat connection setup
with fresh consent. Preserve unrelated local connections.

The production OAuth resource is `https://api.vetintelcompany.com/v0`; its issuer is
`https://www.vetintelcompany.com/api/auth`. Staging 0.1.0 at
`https://api.staging.vetintelcompany.com/v0/mcp` is historical/testing configuration, not a fallback.
See [promotion gates](PROMOTION.md).
