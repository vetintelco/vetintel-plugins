import { expect, test } from "bun:test";
import { assertNoSecrets, validatePackage } from "./package-contract";

const input = {
  release: await Bun.file(new URL("../release.json", import.meta.url)).json(),
  manifest: await Bun.file(new URL("../plugins/vetintel/.codex-plugin/plugin.json", import.meta.url)).json(),
  mcp: await Bun.file(new URL("../plugins/vetintel/.mcp.json", import.meta.url)).json(),
  marketplace: await Bun.file(new URL("../.agents/plugins/marketplace.json", import.meta.url)).json(),
};
test("the reviewed package satisfies the contract", () => expect(() => validatePackage(input)).not.toThrow());
test("cross-environment URLs, credentials, local servers, hooks and app references are rejected", () => {
  for (const url of ["http://localhost:3000/v0/mcp", "https://api.vetintelcompany.com/v0/mcp", "https://other.example/mcp"]) {
    expect(() => validatePackage({ ...input, mcp: { mcpServers: { vetintel: { url } } } })).toThrow();
  }
  for (const addition of [{ headers: { authorization: "Bearer secret" } }, { command: "shell" }]) {
    expect(() => validatePackage({ ...input, mcp: { mcpServers: { vetintel: { ...input.mcp.mcpServers.vetintel, ...addition } } } })).toThrow();
  }
  for (const addition of [{ hooks: "./hooks.json" }, { apps: "./.app.json" }, { skills: "./skills" }]) {
    expect(() => validatePackage({ ...input, manifest: { ...input.manifest, ...addition } })).toThrow();
  }
});
test("production promotion requires a consistent release, manifest and endpoint", () => {
  expect(() => validatePackage({ ...input, release: { ...input.release, environment: "production" } })).toThrow();
});
test("credential detector rejects key material and accepts ordinary installation copy", () => {
  expect(() => assertNoSecrets(`vi_live_${"x".repeat(64)}`)).toThrow();
  expect(() => assertNoSecrets("Use OAuth to connect your account.")).not.toThrow();
});
