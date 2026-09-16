/// <reference types="node" />

import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

import { themeVariables } from "../libs/theme.ts";

const ROOT_DIR = join(import.meta.dirname, "..");
const SOURCE_PATH = join(ROOT_DIR, "public", "icon.png");
const OUTPUT_DIR = join(ROOT_DIR, "public", "icons");

const MASKABLE_SCALE = 0.72;
const APPLE_TOUCH_SCALE = 0.88;

const background = themeVariables.find((candidate) => candidate.name === "--bg");
if (!background) {
  throw new Error("テーマ変数が見つかりません: --bg");
}
const [r, g, b] = background.defaultValue.split(" ").map(Number);
const backgroundColor = { r, g, b, alpha: 1 };

const transparentIcons = [
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
  { file: "favicon-32.png", size: 32 },
];

const flattenedIcons = [
  { file: "icon-maskable-512.png", size: 512, scale: MASKABLE_SCALE },
  { file: "apple-touch-icon.png", size: 180, scale: APPLE_TOUCH_SCALE },
];

await mkdir(OUTPUT_DIR, { recursive: true });

for (const { file, size } of transparentIcons) {
  const info = await sharp(SOURCE_PATH)
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(join(OUTPUT_DIR, file));
  console.log(`${file} (${size}x${size}, ${(info.size / 1024).toFixed(1)}KB)`);
}

for (const { file, size, scale } of flattenedIcons) {
  const inner = Math.round(size * scale);
  const icon = await sharp(SOURCE_PATH).resize(inner, inner).png().toBuffer();
  const info = await sharp({
    create: { width: size, height: size, channels: 4, background: backgroundColor },
  })
    .composite([{ input: icon, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(join(OUTPUT_DIR, file));
  console.log(`${file} (${size}x${size}, 内側 ${Math.round(scale * 100)}%, ${(info.size / 1024).toFixed(1)}KB)`);
}

console.log(`\n${transparentIcons.length + flattenedIcons.length} 件のアイコンを生成しました。`);
