import assert from "node:assert/strict";

const environments = {
  staging: { version: "0.1.0", mcpUrl: "https://api.staging.vetintelcompany.com/v0/mcp", displayName: "Veterinary Intelligence (Test)" },
  production: { version: "0.2.0", mcpUrl: "https://api.vetintelcompany.com/v0/mcp", displayName: "Veterinary Intelligence" },
} as const;

const record = (value: unknown): Record<string, unknown> => {
  assert.ok(value !== null && typeof value === "object" && !Array.isArray(value));
  return value as Record<string, unknown>;
};

export const validatePackage = (input: {
  release: unknown; manifest: unknown; mcp: unknown; marketplace: unknown;
}): void => {
  const release = record(input.release);
  assert.ok(release.environment === "staging" || release.environment === "production");
  const expected = environments[release.environment];
  assert.deepEqual(release, { environment: release.environment, ...expected });
  assert.deepEqual(input.mcp, { mcpServers: { vetintel: { url: expected.mcpUrl } } });
  assert.deepEqual(input.marketplace, {
    name: "vetintel-internal",
    interface: { displayName: "Veterinary Intelligence — Internal" },
    plugins: [{ name: "vetintel", source: { source: "local", path: "./plugins/vetintel" }, policy: { installation: "AVAILABLE", authentication: "ON_INSTALL" }, category: "Productivity" }],
  });
  const manifest = record(input.manifest);
  assert.deepEqual(Object.keys(manifest).sort(), ["name", "version", "description", "author", "repository", "interface", "mcpServers"].sort());
  assert.equal(manifest.name, "vetintel");
  assert.equal(manifest.version, expected.version);
  assert.equal(manifest.mcpServers, "./.mcp.json");
  assert.equal(manifest.repository, "https://github.com/vetintelco/vetintel-plugins");
  assert.deepEqual(manifest.author, { name: "The Veterinary Intelligence Company" });
  assert.ok(typeof manifest.description === "string" && manifest.description.length > 20);
  const presentation = record(manifest.interface);
  assert.deepEqual(Object.keys(presentation).sort(), ["displayName", "shortDescription", "longDescription", "developerName", "category", "capabilities", "brandColor", "logo", "composerIcon", "websiteURL", "defaultPrompt"].sort());
  assert.equal(presentation.displayName, expected.displayName);
  assert.equal(presentation.developerName, "The Veterinary Intelligence Company");
  assert.equal(presentation.category, "Productivity");
  assert.deepEqual(presentation.capabilities, ["Read"]);
  assert.equal(presentation.brandColor, "#111827");
  assert.equal(presentation.logo, "./assets/logo.png");
  assert.equal(presentation.composerIcon, "./assets/logo.png");
  assert.equal(presentation.websiteURL, "https://www.vetintelcompany.com");
  assert.ok(typeof presentation.shortDescription === "string" && presentation.shortDescription.length <= 40);
  assert.ok(typeof presentation.longDescription === "string" && presentation.longDescription.length > 30);
  assert.ok(Array.isArray(presentation.defaultPrompt) && presentation.defaultPrompt.length > 0 && presentation.defaultPrompt.length <= 3);
  for (const prompt of presentation.defaultPrompt) assert.ok(typeof prompt === "string" && prompt.length <= 128);
};

export const assertNoSecrets = (text: string): void => {
  assert.ok(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\bvi_(?:live|test|dev)_[A-Za-z0-9_-]{24,}|\bgh[pousr]_[A-Za-z0-9]{30,}|\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/.test(text), "Possible credential found; do not publish");
};
