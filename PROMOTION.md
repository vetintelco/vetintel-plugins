# Release gates

## 0.3.0 — Claude support and mandatory reconnect (candidate)

Do not merge/publish this candidate before the application changes are reviewed, deployed and
validated. Public packaging remains admin-only data access, not a customer launch.

- [ ] App PR lands in staging with green auth/API/MCP/browser/quality checks.
- [ ] Staging API/web use the exact `/v0/mcp` resource; issuer unchanged. CIMD/default registration,
  PKCE, hosted and local callbacks, fresh OAuth, refresh/restart and all eight tools pass in actual
  Claude Code and Claude web/Desktop/Cowork, plus reconnected Codex/ChatGPT.
- [ ] Same independent-practice count and filters in Radar, direct API, Codex and Claude.
- [ ] Scope/isolation, denied customer organizations, revocation, suspension, membership removal,
  kill switches, old-audience refresh rejection, byte limits and usage attribution pass.
- [ ] Normal release to main: required checks, human approval and fresh Render backup gate.
- [ ] Coordinate a brief MCP interruption while deploying/configuring API and web together.
  Keep production enabled only for Vetintel Admin Organization after readiness checks.
- [ ] Fresh production OAuth and bounded reads pass using the unpublished candidate.
- [ ] Review and merge this package, release 0.3.0, and notify existing users to refresh,
  update/reinstall and complete new OAuth. Old `/v0` access and refresh tokens are not compatible.
- [ ] Two approved members pass fresh consent, all eight tools, refresh after expiry and restart.
- [ ] Revoke only superseded pilot grants; retain unrelated connections and audit history.
- [ ] 48-hour production observation completes with sanitized evidence and no unresolved failures.

No migration, rebuild, new service, API key distribution or Anthropic API credential is required.
If checks fail, leave this package unpublished. Disable affected MCP access for rollback; never
silently switch clients back to staging or reintroduce the old audience.

### Package validation

Run `bun run check` and `bun test`. CI additionally runs pinned official Claude Code 2.1.266:

```bash
bunx @anthropic-ai/claude-code@2.1.266 plugin validate . --strict
bunx @anthropic-ai/claude-code@2.1.266 plugin validate ./claude/plugins/vetintel --strict
```

Validate the Codex package with the Codex plugin validator before review. No installed user
connections are needed to run these package checks. They do not prove hosted OAuth installation.

The sections below retain historical 0.1/0.2 release decisions; their old OAuth audience is not
the 0.3.0 configuration. Record current evidence here without secrets or customer response bodies.

## 0.1.0 — Staging

- [ ] Application PR #449 retargeted to staging before deleting the base branch.
- [ ] API PR #446 merged, #449 rebased to remove the squashed base, quality gates rerun.
- [ ] MCP PR #449 merged into staging; API/web deployment and migrations verified.
- [ ] Readiness passes; only the staging pilot organization is enabled.
- [ ] Marketplace packaging reviewed and validated before merging to this repository's main branch.
- [ ] Two independent accounts pass Codex desktop, Codex CLI, and ChatGPT acceptance.
- [ ] All seven tools, refresh, restart, live revocation, isolation, limits, and usage pass.
- [ ] 48-hour staging pilot evidence recorded; no unresolved security or data-correctness failures.

## 0.2.0 — Production internal pilot

### Latest operator evidence — 2026-09-09

- Application #475 merged to staging as `47cddf3314cc26605795917cf435285968b3f0f2`.
- Release #476 merged to main as `2ad0b96f7944ed53566eca3b024681abea9bc535`, with exact-head human
  approval and green release checks. Ben explicitly waived a fresh backup for this release only;
  this does not remove backup requirements for later releases.
- Web, Mastra, worker and API deployed that SHA. The initial API migration lock blockage was
  recovered; migration 0145 completed through normal pre-deploy. No database replacement,
  graph backfill, or projection rebuild was required.
- The user explicitly authorized publishing the marketplace and enabling production MCP only for
  **Vetintel Admin Organization**. Package 0.2.0 is merged; the repository is now public, with
  GitHub secret scanning and push protection enabled. Publication does not complete the remaining
  OAuth, eight-tool, two-member, parity, or observation acceptance gates below.
- The configured pilot organization is **Vetintel Admin Organization**. Each user needs their
  own approved account and live membership; do not copy a staging token or share an API key.

Ben approved an accelerated VetIntel-only pilot on 2026-09-09 UTC. Focused staging OAuth,
refresh/restart, revocation, isolation, eight-tool discovery and Radar/MCP parity replace the
pre-production 48-hour staging soak. Broader hosted-client acceptance is not marked complete.
Retain two-member production verification and 48-hour production observation.

Application release requires a fresh completed Render-managed export of the verified production
database (dpg-dadoeu740ujc73cbl5g0-a / vetintel_production_v2), verified PITR, green release checks
and human approval unless explicitly waived for a particular release as recorded above.
No production database exports or signed download URLs belong in this repo.
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
- [x] Reviewed marketplace promotion passes CI and is merged/released.
- [ ] Users refresh the marketplace, update/reinstall, restart, and reconnect to production.
- [ ] Desktop setup verifies 0.2.0 and the production URL; workspace import is separately checked
      if used. Do not claim this `.mcp.json` package supports ChatGPT web.
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
