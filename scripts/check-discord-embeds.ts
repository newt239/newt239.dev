import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const embedScript = /<script\b[^>]*\bid="discord:component-embed"[^>]*>([\s\S]*?)<\/script>/;
const requiredOgProperties = ["og:title", "og:description", "og:image", "og:url"];
const maxBytes = 3000;
const maxComponents = 40;
const allowedButtonKeys = new Set(["id", "type", "url", "style", "label", "emoji", "disabled"]);

type Media = { url: string };
type Component = {
  type: number;
  components?: Component[];
  accessory?: Component;
  media?: Media;
  items?: { media: Media }[];
  [key: string]: unknown;
};

export const checkDiscordEmbeds = async (publicDir: string) => {
  const workFiles = (await readdir(join(publicDir, "works"))).filter((file) => file.endsWith(".html"));
  const pages = ["index.html", ...workFiles.map((file) => `works/${file}`)];
  const errors: string[] = [];
  const sizes: { page: string; bytes: number }[] = [];

  for (const page of pages) {
    const html = await readFile(join(publicDir, page), "utf8");
    const head = html.slice(0, html.indexOf("</head>"));
    const missingOg = requiredOgProperties.filter((property) => !head.includes(`property="${property}"`));
    if (missingOg.length > 0) errors.push(`${page}: ${missingOg.join(", ")} がありません`);

    const json = embedScript.exec(head)?.[1];
    if (json === undefined) {
      errors.push(`${page}: <head> に discord:component-embed がありません`);
      continue;
    }
    const bytes = Buffer.byteLength(json);
    sizes.push({ page, bytes });
    if (bytes > maxBytes) errors.push(`${page}: ${bytes} バイトで上限の ${maxBytes} バイトを超えています`);
    if (json.includes("<")) errors.push(`${page}: エスケープされていない < があります`);

    const { component } = JSON.parse(json) as { component: Component };
    const all: Component[] = [];
    const walk = (node: Component) => {
      all.push(node);
      node.components?.forEach(walk);
      if (node.accessory) walk(node.accessory);
    };
    walk(component);
    if (component.type !== 17) errors.push(`${page}: トップレベルが Container ではありません`);
    if (all.filter((node) => node.type === 17).length > 1) errors.push(`${page}: Container が入れ子になっています`);
    if (all.length > maxComponents) errors.push(`${page}: コンポーネントが ${all.length} 個あります`);
    const mediaUrls = all.flatMap((node) => [node.media, ...(node.items ?? []).map((item) => item.media)]);
    for (const media of mediaUrls) {
      if (media && !existsSync(join(publicDir, decodeURIComponent(new URL(media.url).pathname)))) {
        errors.push(`${page}: ${media.url} がビルド出力にありません`);
      }
    }
    for (const button of all.filter((node) => node.type === 2)) {
      const extraKeys = Object.keys(button).filter((key) => !allowedButtonKeys.has(key));
      if (button.style !== 5 || !button.url || extraKeys.length > 0) {
        errors.push(`${page}: 不正なボタンがあります ${JSON.stringify(button)}`);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Discord Component Embed の検証に失敗しました\n${errors.join("\n")}`);
  }
  const largest = sizes.reduce((a, b) => (b.bytes > a.bytes ? b : a));
  console.info(
    `Discord Component Embed: ${sizes.length} ページを検証しました（最大 ${largest.bytes} バイト: ${largest.page}）`
  );
};
