/// <reference types="node" />

import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp, { type ResizeOptions } from "sharp";

import type { LinkCard } from "../libs/link-card.ts";

const ROOT_DIR = join(import.meta.dirname, "..");
const WORKS_DIR = join(ROOT_DIR, "content", "works");
const DATA_FILE = join(ROOT_DIR, "libs", "link-cards.json");
const IMAGE_DIR = join(ROOT_DIR, "public", "link-cards");

// X は User-Agent に bot を含むリクエストにだけ OGP を返す
const USER_AGENT = "Mozilla/5.0 (compatible; newt239.dev-link-card-bot/1.0; +https://newt239.dev)";
const IMAGE_WIDTH = 640;
const ICON_SIZE = 64;

const X_HOSTS = new Set(["x.com", "www.x.com", "mobile.x.com", "twitter.com", "www.twitter.com", "mobile.twitter.com"]);
const YOUTUBE_HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com", "music.youtube.com", "www.youtube-nocookie.com"]);

const fetchOk = async (url: string, retried = false): Promise<Response> => {
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT }, signal: AbortSignal.timeout(30_000) });
  // opengraph.githubassets.com は回数制限があり、Retry-After に従えば取得できる。待っても解けなければ止める
  const retryAfter = Number(response.headers.get("Retry-After"));
  if (response.status === 429 && !retried && retryAfter > 0 && retryAfter <= 900) {
    console.log(`レート制限のため ${retryAfter} 秒待ちます: ${url}`);
    await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
    return fetchOk(url, true);
  }
  if (!response.ok) {
    throw new Error(`${url} の取得に失敗しました: HTTP ${response.status}`);
  }
  return response;
};

const decodeEntities = (text: string) =>
  text.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (_, entity: string) => {
    const lower = entity.toLowerCase();
    if (lower.startsWith("#x")) return String.fromCodePoint(Number.parseInt(lower.slice(2), 16));
    if (lower.startsWith("#")) return String.fromCodePoint(Number.parseInt(lower.slice(1), 10));
    return { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " }[lower] ?? "";
  });

const parseAttributes = (tag: string) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(([, key, double, single]) => [
      key!.toLowerCase(),
      decodeEntities(double ?? single ?? ""),
    ])
  );

// chat の collectMeta と同じく、最初に出現した値だけを残す
const collectMeta = (html: string) => {
  const meta = new Map<string, string>();
  const setOnce = (key: string | undefined, value: string | undefined) => {
    if (key && value && !meta.has(key)) meta.set(key, value.trim());
  };
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = parseAttributes(tag);
    setOnce(attrs.property || attrs.name || (attrs.itemprop && `itemprop:${attrs.itemprop}`), attrs.content);
  }
  setOnce("title", decodeEntities(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? ""));
  setOnce("author:name", html.match(/itemprop="author"[^>]*>(?:\s*<link[^>]*>)*?\s*<link itemprop="name" content="([^"]*)"/)?.[1]);
  return meta;
};

const fetchMeta = async (url: URL) => {
  const response = await fetchOk(url.href);
  const html = await response.text();
  return { html, meta: collectMeta(html), finalUrl: new URL(response.url) };
};

const firstOf = (meta: Map<string, string>, ...keys: string[]) =>
  keys.map((key) => meta.get(key)).find((value) => value !== undefined);

const youTubeVideoId = (url: URL) => {
  const host = url.hostname.toLowerCase();
  const id =
    host === "youtu.be"
      ? url.pathname.split("/")[1]
      : YOUTUBE_HOSTS.has(host) && url.pathname === "/watch"
        ? url.searchParams.get("v")
        : YOUTUBE_HOSTS.has(host)
          ? url.pathname.match(/^\/(?:shorts|embed|live|v)\/([^/]+)/)?.[1]
          : undefined;
  return id && /^[\w-]{11}$/.test(id) ? id : undefined;
};

const parseIsoDuration = (value: string | undefined) => {
  const match = value?.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return undefined;
  const seconds = Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0);
  return seconds > 0 ? seconds : undefined;
};

const saveImage = async (response: Response, fileName: string, resize: ResizeOptions) => {
  await sharp(Buffer.from(await response.arrayBuffer()))
    .resize(resize)
    .webp({ quality: 80 })
    .toFile(join(IMAGE_DIR, fileName));
  return `/link-cards/${fileName}`;
};

// .ico は sharp が読めないため、宣言されたアイコンから除き、無ければ Google の favicon サービスに頼る
const fetchIcon = async (html: string, pageUrl: URL) => {
  const candidates = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map(([tag]) => parseAttributes(tag))
    .filter((attrs) => /(^|\s)(icon|apple-touch-icon)(\s|$)/i.test(attrs.rel ?? "") && attrs.href && !/\.ico(\?|$)/i.test(attrs.href))
    .sort((a, b) => Number(/apple-touch-icon/i.test(b.rel ?? "")) - Number(/apple-touch-icon/i.test(a.rel ?? "")));
  const href = candidates[0]?.href;
  if (href) return fetchOk(new URL(href, pageUrl).href);
  const fallbackUrl = `https://www.google.com/s2/favicons?domain=${pageUrl.hostname}&sz=${ICON_SIZE}`;
  const response = await fetch(fallbackUrl, { headers: { "User-Agent": USER_AGENT }, signal: AbortSignal.timeout(15_000) });
  // favicon を持たないサイトには 404 が返るので、アイコンなしのカードにする
  if (response.status === 404) return undefined;
  if (!response.ok) {
    throw new Error(`${fallbackUrl} の取得に失敗しました: HTTP ${response.status}`);
  }
  return response;
};

const buildCard = async (rawUrl: string): Promise<LinkCard> => {
  const url = new URL(rawUrl);
  const hash = createHash("sha256").update(rawUrl).digest("hex").slice(0, 12);
  const domain = url.hostname.replace(/^www\./, "");

  const videoId = youTubeVideoId(url);
  if (videoId) {
    const watchUrl = new URL(`https://www.youtube.com/watch?v=${videoId}`);
    const { meta } = await fetchMeta(watchUrl);
    let title = firstOf(meta, "og:title", "title");
    let channelName = meta.get("author:name");
    // 同意画面などで動画ページのメタデータが取れない場合に備える
    if (!title) {
      const oembed = (await (
        await fetchOk(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(watchUrl.href)}`)
      ).json()) as { title: string; author_name: string };
      title = oembed.title;
      channelName = oembed.author_name;
    }
    return {
      kind: "youtube",
      title: title ?? rawUrl,
      domain,
      image: await saveImage(
        await fetchOk(meta.get("og:image") ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`),
        `${hash}-image.webp`,
        { width: IMAGE_WIDTH, height: Math.round((IMAGE_WIDTH * 9) / 16), fit: "cover" }
      ),
      youtube: { channelName, durationSeconds: parseIsoDuration(meta.get("itemprop:duration")) },
    };
  }

  // npm のパッケージページは bot を 403 で弾くため、レジストリの API から読む
  const npmPackage = domain === "npmjs.com" ? url.pathname.match(/^\/package\/((?:@[^/]+\/)?[^/]+)/)?.[1] : undefined;
  if (npmPackage) {
    const registry = (await (
      await fetchOk(`https://registry.npmjs.org/${npmPackage.replaceAll("/", "%2f")}`)
    ).json()) as { name: string; description?: string };
    const iconResponse = await fetchIcon("", url);
    return {
      kind: "generic",
      title: registry.name,
      description: registry.description,
      siteName: "npm",
      domain,
      icon: iconResponse && (await saveImage(iconResponse, `icon-${domain}.webp`, { width: ICON_SIZE, height: ICON_SIZE, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })),
    };
  }

  const { html, meta, finalUrl } = await fetchMeta(url);
  const title = firstOf(meta, "og:title", "twitter:title", "title");
  if (!title) {
    throw new Error(`${rawUrl} のタイトルが取得できません`);
  }
  const description = firstOf(meta, "og:description", "twitter:description", "description");
  const imageSource = firstOf(meta, "og:image", "og:image:url", "twitter:image");
  const imageUrl = imageSource && new URL(imageSource, finalUrl).href;

  // X は「名前 (@ID) on X」形式のタイトルを返す。削除済みなどで形式が違えば通常のカードにする
  const xAuthor =
    X_HOSTS.has(url.hostname.toLowerCase()) && /^\/\w{1,15}\/status\/\d+/.test(url.pathname)
      ? title.match(/^(.*) \(@(\w{1,15})\) on X$/)
      : null;
  if (xAuthor) {
    // 画像のない投稿では X が投稿者のアイコンを og:image に入れる
    const hasMedia = meta.get("twitter:card") === "summary_large_image";
    return {
      kind: "x",
      title,
      description,
      domain,
      image:
        imageUrl && hasMedia
          ? await saveImage(await fetchOk(imageUrl), `${hash}-image.webp`, { width: IMAGE_WIDTH, withoutEnlargement: true })
          : undefined,
      icon:
        imageUrl && !hasMedia
          ? await saveImage(await fetchOk(imageUrl), `${hash}-icon.webp`, { width: ICON_SIZE, height: ICON_SIZE, fit: "cover" })
          : undefined,
      x: { authorName: xAuthor[1]!, authorHandle: xAuthor[2]! },
    };
  }

  const iconResponse = await fetchIcon(html, finalUrl);
  return {
    kind: "generic",
    title,
    description,
    siteName: meta.get("og:site_name"),
    domain,
    image:
      imageUrl &&
      (await saveImage(await fetchOk(imageUrl), `${hash}-image.webp`, { width: IMAGE_WIDTH, withoutEnlargement: true })),
    icon:
      iconResponse &&
      (await saveImage(iconResponse, `icon-${domain}.webp`, {
        width: ICON_SIZE,
        height: ICON_SIZE,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })),
  };
};

const files = (await readdir(WORKS_DIR)).filter((file) => file.endsWith(".md"));
const urls = new Set<string>();
for (const file of files) {
  const markdown = await readFile(join(WORKS_DIR, file), "utf8");
  for (const [, url] of markdown.matchAll(/^::link-card\{url="([^"]+)"\}/gm)) {
    urls.add(url!);
  }
}

const refresh = process.argv.includes("--refresh");
const existing: Record<string, LinkCard> =
  !refresh && existsSync(DATA_FILE) ? JSON.parse(await readFile(DATA_FILE, "utf8")) : {};
if (refresh) {
  await rm(IMAGE_DIR, { recursive: true, force: true });
}
await mkdir(IMAGE_DIR, { recursive: true });

const writeCards = (cards: Record<string, LinkCard>) =>
  writeFile(DATA_FILE, `${JSON.stringify(Object.fromEntries(Object.entries(cards).toSorted(([a], [b]) => (a < b ? -1 : 1))), null, 2)}\n`, "utf8");

// レート制限で途中で止まっても、再実行で続きから取得できるよう 1 件ごとに書き出す
const cards: Record<string, LinkCard> = Object.fromEntries(
  [...urls].flatMap((url) => (existing[url] ? [[url, existing[url]]] : []))
);
for (const url of [...urls].sort().filter((url) => !cards[url])) {
  console.log(`取得中: ${url}`);
  cards[url] = await buildCard(url);
  await writeCards(cards);
}

const usedImages = new Set(
  Object.values(cards).flatMap((card) => [card.image, card.icon]).filter((path) => path !== undefined)
);
for (const file of await readdir(IMAGE_DIR)) {
  if (!usedImages.has(`/link-cards/${file}`)) {
    await rm(join(IMAGE_DIR, file));
  }
}

await writeCards(cards);
console.log(`${Object.keys(cards).length} 件のリンクカードを書き出しました`);
