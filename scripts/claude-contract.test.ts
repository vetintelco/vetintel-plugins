import { expect, test } from "bun:test";
import { validateClaudePackage } from "./claude-contract";

const input = {
  release: await Bun.file(new URL("../release.json", import.meta.url)).json(),
  manifest: await Bun.file(new URL("../claude/plugins/vetintel/.claude-plugin/plugin.json", import.meta.url)).json(),
  mcp: await Bun.file(new URL("../claude/plugins/vetintel/.mcp.json", import.meta.url)).json(),
  marketplace: await Bun.file(new URL("../.claude-plugin/marketplace.json", import.meta.url)).json(),
};
test("Claude packaging uses its own manifest schema and the same release endpoint", () => {
  expect(() => validateClaudePackage(input)).not.toThrow();
  for (const fields of [{ command: "shell" }, { headers: { authorization: "secret" } }, { type: "sse" }, { url: "https://api.staging.vetintelcompany.com/v0/mcp" }])
    expect(() => validateClaudePackage({ ...input, mcp: { mcpServers: { vetintel: { ...input.mcp.mcpServers.vetintel, ...fields } } } })).toThrow();
  for (const fields of [{ hooks: {} }, { skills: "./skills" }, { agents: "./agents" }, { version: "0.2.0" }, { interface: {} }])
    expect(() => validateClaudePackage({ ...input, manifest: { ...input.manifest, ...fields } })).toThrow();
  for (const source of ["../outside", "./plugins/vetintel", "https://other.example/plugin"])
    expect(() => validateClaudePackage({ ...input, marketplace: { ...input.marketplace, plugins: [{ ...input.marketplace.plugins[0], source }] } })).toThrow();
});
