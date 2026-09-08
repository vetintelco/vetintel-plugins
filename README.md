# Veterinary Intelligence — Internal Marketplace

Private integration packaging for The Veterinary Intelligence Company. This repository does not contain application code or credentials.

## Rollout status

This preparation branch contains the staging 0.1.0 package. **Do not distribute it before readiness.**
Application PRs vetintelco/vetintel#446 and #449 must merge into `staging`, deploy successfully,
and pass readiness checks before the staging package is released here and pilot users are invited.

Once released, follow [installation instructions](INSTALL.md). Maintainers follow
[staging acceptance and production promotion](PROMOTION.md). The stable marketplace name is
`vetintel-internal`; the plugin is `vetintel`. A later, explicitly reviewed 0.2.0 release changes
the endpoint to production and requires fresh consent.

An administrator grants read access to this repository. GitHub access does not grant access to
company data: every user must separately sign in to an approved Veterinary Intelligence Company
account and consent for an enabled organization.

Production remains disabled until the staging pilot passes. No shared OAuth credentials or API
keys may be added to this repository.
