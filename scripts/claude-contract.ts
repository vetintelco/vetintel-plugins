import assert from "node:assert/strict";

export const validateClaudePackage = (input: {
  release: { environment: string; version: string; mcpUrl: string };
  manifest: unknown; marketplace: unknown; mcp: unknown;
}): void => {
  assert.equal(input.release.environment, "production");
  assert.equal(input.release.version, "0.3.0");
  assert.equal(input.release.mcpUrl, "https://api.vetintelcompany.com/v0/mcp");
  assert.deepEqual(input.mcp, { mcpServers: { vetintel: { type: "http", url: input.release.mcpUrl } } });
  assert.deepEqual(input.marketplace, {
    name: "vetintel-internal",
    description: "Read-only veterinary intelligence for approved internal members.",
    owner: { name: "The Veterinary Intelligence Company" },
    plugins: [{ name: "vetintel", source: "./claude/plugins/vetintel", description: "Production · Read-only veterinary intelligence for approved internal members." }],
  });
  assert.deepEqual(input.manifest, {
    name: "vetintel", displayName: "Veterinary Intelligence", version: input.release.version,
    description: "Production · Read-only veterinary intelligence. Access requires an approved member of Vetintel Admin Organization; public installation does not grant customer access.",
    author: { name: "The Veterinary Intelligence Company" },
    homepage: "https://www.vetintelcompany.com",
    repository: "https://github.com/vetintelco/vetintel-plugins",
    mcpServers: "./.mcp.json",
  });
};
