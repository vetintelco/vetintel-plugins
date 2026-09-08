import assert from "node:assert/strict";
import { lstat, realpath } from "node:fs/promises";
import { resolve } from "node:path";
import { assertNoSecrets, validatePackage } from "./package-contract";

const root = resolve(import.meta.dir, "..");
const json = async (path: string): Promise<unknown> => await Bun.file(resolve(root, path)).json();
validatePackage({
  release: await json("release.json"),
  manifest: await json("plugins/vetintel/.codex-plugin/plugin.json"),
  mcp: await json("plugins/vetintel/.mcp.json"),
  marketplace: await json(".agents/plugins/marketplace.json"),
});
const files = [...new Bun.Glob("**/*").scanSync({ cwd: resolve(root, "plugins"), dot: true, onlyFiles: true })].sort();
for (const relative of new Bun.Glob("**/*").scanSync({ cwd: resolve(root, "plugins"), dot: true, onlyFiles: false })) {
  assert.ok(!(await lstat(resolve(root, "plugins", relative))).isSymbolicLink(), "Plugin symlinks are forbidden");
}
assert.deepEqual(files, ["vetintel/.codex-plugin/plugin.json", "vetintel/.mcp.json", "vetintel/assets/logo.png"]);
for (const relative of files) {
  const path = resolve(root, "plugins", relative);
  assert.ok(!(await lstat(path)).isSymbolicLink(), "Plugin symlinks are forbidden");
  assert.ok((await realpath(path)).startsWith(`${root}/plugins/`));
}
const logo = new Uint8Array(await Bun.file(resolve(root, "plugins/vetintel/assets/logo.png")).arrayBuffer());
assert.deepEqual([...logo.slice(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
assert.ok(logo.length < 2 * 1024 * 1024);
for (const path of new Bun.Glob("**/*").scanSync({ cwd: root, dot: true, onlyFiles: true })) {
  if (path.startsWith(".git/") || path.startsWith("node_modules/") || path.endsWith(".png")) continue;
  assert.ok(!/(^|\/)\.env(?:\.|$)|\.(?:pem|key)$/.test(path), "Credential files are forbidden");
  assertNoSecrets(await Bun.file(resolve(root, path)).text());
}
console.log("Marketplace validated: one read-only remote MCP, consistent environment, no bundled credentials or executables.");
