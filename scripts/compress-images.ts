/// <reference types="node" />

import { readdir, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public", "images");
const MAX_WIDTH = 2000;

const TARGET_EXTENSIONS = new Set(
  [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif"].map((e) =>
    e.toLowerCase()
  )
);

async function* walkDir(dir: string): AsyncGenerator<string> {
  let entries: { name: string; isFile: () => boolean }[];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    console.warn(`スキップ: ${dir}`, err);
    return;
  }
  for (const ent of entries) {
    const full = join(dir, ent.name);
    if (ent.isFile()) {
      yield full;
    } else {
      yield* walkDir(full);
    }
  }
}

function isTargetImage(path: string): boolean {
  const ext = path.slice(path.lastIndexOf(".")).toLowerCase();
  return TARGET_EXTENSIONS.has(ext);
}

async function compressImage(inputPath: string): Promise<void> {
  const ext = inputPath.slice(inputPath.lastIndexOf("."));
  const base = inputPath.slice(0, -ext.length);
  const outputPath = `${base}.webp`;

  const meta = await sharp(inputPath).metadata();
  const width = meta.width ?? 0;

  const pipeline = sharp(inputPath);
  if (width > MAX_WIDTH) {
    pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  await pipeline.webp({ quality: 85 }).toFile(outputPath);

  const [before, after] = await Promise.all([
    stat(inputPath).then((s) => s.size),
    stat(outputPath).then((s) => s.size),
  ]);
  const saved = ((1 - after / before) * 100).toFixed(1);
  console.log(`${inputPath} → ${outputPath} (${saved}% 削減)`);
}

async function main(): Promise<void> {
  let count = 0;
  for await (const filePath of walkDir(PUBLIC_DIR)) {
    if (!isTargetImage(filePath)) continue;
    await compressImage(filePath);
    count++;
  }
  if (count === 0) {
    console.log("変換対象の画像はありませんでした。");
  } else {
    console.log(`\n${count} 件の画像を WebP に変換しました。`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
