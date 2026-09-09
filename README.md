# Veterinary Intelligence — Internal Marketplace

Private integration packaging for The Veterinary Intelligence Company. This repository does not contain application code or credentials.

## Rollout status

This branch prepares production 0.2.0. **Do not merge or distribute it before production readiness
and fresh OAuth checks pass.** Production access stays restricted to **Vetintel Admin Organization**.
Application release #476 was merged, but its API deployment failed during migration 0145; merging
the application PR alone does not satisfy this package's publication gate. See [current gates](PROMOTION.md).

Once released, follow [installation instructions](INSTALL.md). Maintainers follow
[staging acceptance and production promotion](PROMOTION.md). The stable marketplace name is
`vetintel-internal`; the plugin is `vetintel`. Release 0.2.0 changes the endpoint to production and
requires fresh consent; it does not migrate staging connections automatically.

Installation covers ChatGPT desktop/Codex, optional ChatGPT workspace marketplace import, and a
separate ChatGPT web connection. The `.mcp.json` marketplace package is desktop-only; a local
installation must not be presented as an account-wide ChatGPT web connector.

An administrator grants read access to this repository. GitHub access does not grant access to
company data: every user must separately sign in to an approved Veterinary Intelligence Company
account and consent for an enabled organization.

The accelerated internal pilot requires focused staging OAuth/security/parity checks and a 48-hour
production observation period. It is not general customer activation. No shared OAuth credentials
or API keys may be added to this repository. Staging 0.1.0 remains in Git history for explicit recovery.
