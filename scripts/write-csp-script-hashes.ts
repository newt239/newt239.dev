import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const scriptTag = /<script\b([^>]*)>([\s\S]*?)<\/script\b[^>]*>/gi;
const externalScript = /\ssrc=/i;
const dataBlock = /type=["']application\/(ld\+)?json["']/i;
const placeholder = "{{inline-script-hashes}}";

export const writeCspScriptHashes = async (publicDir: string) => {
  const entries = await readdir(publicDir, { recursive: true, withFileTypes: true });
  const hashes = new Set<string>();

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
    const html = await readFile(join(entry.parentPath, entry.name), "utf8");
    for (const [, attributes = "", body = ""] of html.matchAll(scriptTag)) {
      if (externalScript.test(attributes) || dataBlock.test(attributes)) continue;
      hashes.add(`'sha256-${createHash("sha256").update(body).digest("base64")}'`);
    }
  }

  const headersPath = join(publicDir, "_headers");
  const headers = await readFile(headersPath, "utf8");
  if (!headers.includes(placeholder)) {
    throw new Error(`_headers に ${placeholder} がありません`);
  }
  if (hashes.size === 0) {
    throw new Error("プリレンダ HTML からインラインスクリプトを検出できませんでした");
  }

  await writeFile(headersPath, headers.replaceAll(placeholder, [...hashes].sort().join(" ")));
};
