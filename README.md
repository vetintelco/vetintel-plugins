# Veterinary Intelligence — Internal Marketplace

Public integration packaging for The Veterinary Intelligence Company. This repository does not contain application code or credentials. Dataset access remains restricted to the internal pilot.

## Rollout status

Production package **0.2.0** is published on `main`. Production access stays restricted to
**Vetintel Admin Organization**; customer organizations are not enabled. The application deployment
has recovered. Full hosted-client acceptance remains tracked in [current gates](PROMOTION.md).

Follow [installation instructions](INSTALL.md). Maintainers follow
[staging acceptance and production promotion](PROMOTION.md). The stable marketplace name is
`vetintel-internal`; the plugin is `vetintel`. Release 0.2.0 changes the endpoint to production and
requires fresh consent; it does not migrate staging connections automatically.

Installation covers ChatGPT desktop/Codex, optional ChatGPT workspace marketplace import, and a
separate ChatGPT web connection. The `.mcp.json` marketplace package is desktop-only; a local
installation must not be presented as an account-wide ChatGPT web connector.

This repository can be cloned publicly, without a GitHub access grant. Public package access does not grant access to
company data: every user must separately sign in to an approved Veterinary Intelligence Company
account and consent for an enabled organization.

The accelerated internal pilot requires focused staging OAuth/security/parity checks and a 48-hour
production observation period. It is not general customer activation. No shared OAuth credentials
or API keys may be added to this repository. Staging 0.1.0 remains in Git history for explicit recovery.

GitHub secret scanning and push protection are enabled. Keep credentials in server-side secret
storage, never in commits, issues, logs, manifests, or installation URLs. Automated scanning is
a safeguard, not a substitute for reviewing every change before publication.
