/// <reference types="node" />

import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = join(import.meta.dirname, "..", "public", "images");
const MAX_WIDTH = 2000;
const TARGET_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif"]);

const entries = await readdir(PUBLIC_DIR, { recursive: true, withFileTypes: true });
const targets = entries
  .filter(
    (entry) =>
      entry.isFile() &&
      TARGET_EXTENSIONS.has(entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase())
  )
  .map((entry) => join(entry.parentPath, entry.name));

for (const inputPath of targets) {
  const outputPath = `${inputPath.slice(0, inputPath.lastIndexOf("."))}.webp`;
  const { width = 0 } = await sharp(inputPath).metadata();
  const pipeline = sharp(inputPath);
  if (width > MAX_WIDTH) {
    pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  await pipeline.webp({ quality: 85 }).toFile(outputPath);
  const [before, after] = await Promise.all([stat(inputPath), stat(outputPath)]);
  const saved = ((1 - after.size / before.size) * 100).toFixed(1);
  console.log(`${inputPath} → ${outputPath} (${saved}% 削減)`);
}

if (targets.length === 0) {
  console.log("変換対象の画像はありませんでした。");
} else {
  console.log(`\n${targets.length} 件の画像を WebP に変換しました。`);
}
