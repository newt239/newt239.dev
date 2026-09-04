/// <reference types="node" />

import { existsSync } from "node:fs";
import { readdir, readFile, mkdir, stat } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import satori from "satori";
import sharp from "sharp";
import { parse } from "yaml";

import { formatPeriod } from "../libs/period";

const ROOT_DIR = join(import.meta.dirname, "..");
const WORKS_DIR = join(ROOT_DIR, "content", "works");
const IMAGES_DIR = join(ROOT_DIR, "public", "images");
const OUTPUT_DIR = join(ROOT_DIR, "public", "og");

// サイト本文と同じ FOT-UD角ゴ_ラージ Pr6N を使うため、Adobe Fonts が同期したローカルの実体を読む
const FONT_DIR = join(homedir(), "Library", "Fonts");
const FONT_FILES = {
  regular: join(FONT_DIR, "FOT-UDKakugo_LargePr6N-R.otf"),
  bold: join(FONT_DIR, "FOT-UDKakugo_LargePr6N-B.otf"),
};

const WIDTH = 1200;
const HEIGHT = 630;
const SHOT_HEIGHT = 400;
const CONTENT_WIDTH = 660;

const COLORS = {
  bg: "rgb(255, 248, 240)",
  text: "rgb(48, 42, 37)",
  muted: "rgb(110, 100, 90)",
  accent: "rgb(74, 136, 224)",
};

type WorkFrontmatter = {
  title: string;
  period: string;
  images: { src: string; alt: string }[];
};

const loadFonts = async () => {
  for (const path of Object.values(FONT_FILES)) {
    if (!existsSync(path)) {
      throw new Error(
        `フォントが見つかりません: ${path}\nAdobe Fonts で FOT-UD角ゴ_ラージ Pr6N を同期してから実行してください。`
      );
    }
  }
  const [regular, bold] = await Promise.all([
    readFile(FONT_FILES.regular),
    readFile(FONT_FILES.bold),
  ]);
  return [
    { name: "UDKakugo", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "UDKakugo", data: bold, weight: 700 as const, style: "normal" as const },
  ];
};

const render = async (node: unknown, fonts: Awaited<ReturnType<typeof loadFonts>>, outputPath: string) => {
  const svg = await satori(node as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  });
  const pipeline = sharp(Buffer.from(svg));
  // スクリーンショットを載せる作品用は写真的なので JPEG、平坦な汎用テンプレートは PNG が小さく綺麗
  await (outputPath.endsWith(".jpg")
    ? pipeline.jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
    : pipeline.png({ compressionLevel: 9 })
  ).toFile(outputPath);
  const { size } = await stat(outputPath);
  console.log(`${outputPath.slice(ROOT_DIR.length + 1)} (${Math.round(size / 1024)} KB)`);
};

const workNode = (title: string, period: string, screenshot: string) => ({
  type: "div",
  props: {
    style: {
      display: "flex",
      flexDirection: "column",
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: COLORS.bg,
      fontFamily: "UDKakugo",
    },
    children: [
      {
        type: "img",
        props: { src: screenshot, width: WIDTH, height: SHOT_HEIGHT },
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 18,
            width: WIDTH,
            height: HEIGHT - SHOT_HEIGHT,
            padding: "0 56px",
          },
          children: [
            {
              type: "div",
              props: {
                style: {
                  display: "flex",
                  fontSize: 54,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: COLORS.text,
                },
                children: title,
              },
            },
            {
              type: "div",
              props: {
                style: { display: "flex", alignItems: "baseline", width: "100%" },
                children: [
                  {
                    type: "div",
                    props: {
                      style: { display: "flex", fontSize: 30, color: COLORS.muted },
                      children: formatPeriod(period),
                    },
                  },
                  {
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        marginLeft: "auto",
                        fontSize: 26,
                        color: COLORS.muted,
                      },
                      children: "newt239.dev",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
});

const defaultNode = (title: string, icon: string) => ({
  type: "div",
  props: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: COLORS.bg,
      fontFamily: "UDKakugo",
    },
    children: {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 36,
          width: CONTENT_WIDTH,
        },
        children: [
          {
            type: "div",
            props: {
              style: { display: "flex", alignItems: "center", gap: 20 },
              children: [
                {
                  type: "img",
                  props: { src: icon, width: 72, height: 72, style: { borderRadius: 36 } },
                },
                {
                  type: "div",
                  props: {
                    style: { display: "flex", fontSize: 34, fontWeight: 700, color: COLORS.text },
                    children: "newt239.dev",
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 1.3,
                color: COLORS.text,
              },
              children: title,
            },
          },
        ],
      },
    },
  },
});

const fonts = await loadFonts();
await mkdir(OUTPUT_DIR, { recursive: true });

const iconBuffer = await sharp(join(ROOT_DIR, "public", "icon.png")).resize(176, 176).png().toBuffer();
const icon = `data:image/png;base64,${iconBuffer.toString("base64")}`;

for (const [name, title] of [
  ["about", "わたしについて"],
  ["works", "作品一覧"],
  ["articles", "記事一覧"],
] as const) {
  await render(defaultNode(title, icon), fonts, join(OUTPUT_DIR, `${name}.png`));
}

const files = (await readdir(WORKS_DIR)).filter((file) => file.endsWith(".md"));
for (const file of files) {
  const raw = await readFile(join(WORKS_DIR, file), "utf8");
  const frontmatter = raw.match(/^---\n([\s\S]*?)\n---/)?.[1];
  if (!frontmatter) {
    throw new Error(`frontmatter を読み取れません: ${file}`);
  }
  // failsafe スキーマにしないと period: 2024.10 が数値 2024.1 に丸められて月が壊れる
  const { title, period, images } = parse(frontmatter, {
    schema: "failsafe",
  }) as WorkFrontmatter;
  const [thumbnail] = images;
  if (!thumbnail) {
    throw new Error(`images が空です: ${file}`);
  }
  const screenshotBuffer = await sharp(join(IMAGES_DIR, thumbnail.src))
    .resize(WIDTH, SHOT_HEIGHT, { fit: "cover", position: "top" })
    .png()
    .toBuffer();
  const screenshot = `data:image/png;base64,${screenshotBuffer.toString("base64")}`;
  const slug = file.replace(/\.md$/, "");
  await render(
    workNode(title, period, screenshot),
    fonts,
    join(OUTPUT_DIR, `works-${slug}.jpg`)
  );
}

console.log(`\n${files.length + 3} 件の OG 画像を生成しました。`);
