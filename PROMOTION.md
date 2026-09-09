# Release gates

## 0.1.0 — Staging

- [ ] Application PR #449 retargeted to staging before deleting the base branch.
- [ ] API PR #446 merged, #449 rebased to remove the squashed base, quality gates rerun.
- [ ] MCP PR #449 merged into staging; API/web deployment and migrations verified.
- [ ] Readiness passes; only the staging pilot organization is enabled.
- [ ] Marketplace packaging reviewed and validated before merging to this repository's main branch.
- [ ] Two independent accounts pass Codex desktop, Codex CLI, and ChatGPT acceptance.
- [ ] All seven tools, refresh, restart, live revocation, isolation, limits, and usage pass.
- [ ] 48-hour staging pilot evidence recorded; no unresolved security or data-correctness failures.

## 0.2.0 — Production (blocked until backup, release, and focused acceptance pass)

Ben approved an accelerated VetIntel-only pilot on 2026-09-09 UTC. Focused staging OAuth,
refresh/restart, revocation, isolation, eight-tool discovery and Radar/MCP parity replace the
pre-production 48-hour staging soak. Broader hosted-client acceptance is not marked complete.
Retain two-member production verification and 48-hour production observation.

Application release requires a fresh completed Render-managed export of the verified production
database (dpg-dadoeu740ujc73cbl5g0-a / vetintel_production_v2), verified PITR, green release checks
and human approval. No production database exports or signed download URLs belong in this repo.
Follow the application runbook at plans/drafts/mcp-platform-and-metering/phases/02c-production-promotion.md.

Promote application code via staging and its normal rolling release PR to main. Keep production
MCP disabled until readiness is verified. Enable only the resolved VetIntel production organization.

In one reviewed packaging PR update release.json, plugin version to 0.2.0, display name to
Veterinary Intelligence, .mcp.json endpoint to https://api.vetintelcompany.com/v0/mcp, descriptions,
primary installation documentation, and acceptance tests for the active environment. Keep marketplace
and plugin identifiers unchanged. Update application onboarding's release target in the application
repository through its normal PR/release process. Staging URLs may remain in explicitly labeled
historical, testing, and rollback sections only.

The resource is https://api.vetintelcompany.com/v0 and issuer is
https://www.vetintelcompany.com/api/auth. Never copy staging credentials, grants, or signing secrets.

- [ ] Production API/web readiness, exact origins, and pilot-only allowlist verified.
- [ ] Two approved production members complete fresh OAuth and representative reads.
- [ ] Reviewed marketplace promotion passes CI and is merged/released.
- [ ] Users refresh the marketplace, update/reinstall, restart, and reconnect to production.
- [ ] ChatGPT users verify a new production connector before removing staging.
- [ ] Superseded staging pilot grants revoked without touching unrelated connections.
- [ ] All eight tools and refresh pass in production, followed by a 48-hour observation period.
- [ ] Production Radar and installed Codex MCP independently return matching counts and filters
      for independent practices; do not assume production has staging's 22,585 count.

## Rollback

Disable the affected organization's MCP policy or global MCP switch, or revoke the affected grants.
Retain audit history. Uninstalling the package is not a security rollback. Never silently change
endpoints back to staging. A package rollback requires explicit release notes and fresh consent
if the environment changes.

Record only sanitized client versions, timestamps, counts, and pass/fail results. Do not commit
tokens, authorization URLs, raw tool arguments/results, or production customer data as evidence.
