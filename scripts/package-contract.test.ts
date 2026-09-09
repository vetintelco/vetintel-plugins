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
  const otherEnvironmentUrl = input.release.environment === "production"
    ? "https://api.staging.vetintelcompany.com/v0/mcp"
    : "https://api.vetintelcompany.com/v0/mcp";
  for (const url of ["http://localhost:3000/v0/mcp", otherEnvironmentUrl, "https://other.example/mcp"]) {
    expect(() => validatePackage({ ...input, mcp: { mcpServers: { vetintel: { url } } } })).toThrow();
  }
  for (const addition of [{ headers: { authorization: "Bearer secret" } }, { command: "shell" }]) {
    expect(() => validatePackage({ ...input, mcp: { mcpServers: { vetintel: { ...input.mcp.mcpServers.vetintel, ...addition } } } })).toThrow();
  }
  for (const addition of [{ hooks: "./hooks.json" }, { apps: "./.app.json" }, { skills: "./skills" }]) {
    expect(() => validatePackage({ ...input, manifest: { ...input.manifest, ...addition } })).toThrow();
  }
});
test("both environments require a consistent release, manifest and endpoint", () => {
  for (const [environment, version, mcpUrl, displayName] of [
    ["staging", "0.1.0", "https://api.staging.vetintelcompany.com/v0/mcp", "Veterinary Intelligence (Test)"],
    ["production", "0.3.0", "https://api.vetintelcompany.com/v0/mcp", "Veterinary Intelligence"],
  ]) {
    const consistent = {
      ...input,
      release: { environment, version, mcpUrl, displayName },
      manifest: { ...input.manifest, version, interface: { ...input.manifest.interface, displayName } },
      mcp: { mcpServers: { vetintel: { url: mcpUrl } } },
    };
    expect(() => validatePackage(consistent)).not.toThrow();
    expect(() => validatePackage({ ...consistent, release: { ...consistent.release, version: "9.9.9" } })).toThrow();
    expect(() => validatePackage({ ...consistent, mcp: { mcpServers: { vetintel: { url: "https://other.example/mcp" } } } })).toThrow();
  }
});
test("credential detector rejects key material and accepts ordinary installation copy", () => {
  expect(() => assertNoSecrets(`vi_live_${"x".repeat(64)}`)).toThrow();
  expect(() => assertNoSecrets("Use OAuth to connect your account.")).not.toThrow();
});
