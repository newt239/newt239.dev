/// <reference types="node" />

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";

import { articleList, articleSite } from "../libs/articles.ts";
import { formatPeriod } from "../libs/period.ts";
import { siteName, siteUrl } from "../libs/site.ts";

const ROOT_DIR = join(import.meta.dirname, "..");
const WORKS_DIR = join(ROOT_DIR, "content", "works");
const OUTPUT_FILE = join(ROOT_DIR, "public", "llms.txt");

type WorkFrontmatter = {
  title: string;
  period: string;
  description?: string;
  tech: string[];
};

const files = (await readdir(WORKS_DIR)).filter((file) => file.endsWith(".md"));

const works = await Promise.all(
  files.map(async (file) => {
    const raw = await readFile(join(WORKS_DIR, file), "utf8");
    const frontmatter = raw.match(/^---\n([\s\S]*?)\n---/)?.[1];
    if (!frontmatter) {
      throw new Error(`frontmatter を読み取れません: ${file}`);
    }
    const { title, period, description, tech } = parse(frontmatter, {
      schema: "failsafe",
    }) as WorkFrontmatter;
    return { slug: file.replace(/\.md$/, ""), title, period, description, tech };
  })
);

const workLines = works
  .toSorted((a, b) => b.period.localeCompare(a.period))
  .map((work) =>
    [
      `- [${work.title}](${siteUrl}/works/${work.slug}): ${formatPeriod(work.period)}`,
      work.tech.join(", "),
      work.description,
    ]
      .filter((part) => part !== undefined)
      .join(" / ")
  );

const articleLines = articleList
  .toSorted((a, b) => b.date.localeCompare(a.date))
  .map(
    (article) =>
      `- [${article.title}](${article.url}): ${articleSite(article.url).name} / ${article.date}`
  );

const content = `# ${siteName}

> newt（newt239）のポートフォリオサイト。Webフロントエンドを中心とした個人開発の作品と、外部ブログに書いた技術記事をまとめています。

## ページ

- [プロフィール](${siteUrl}/about): 経歴・資格・所属・SNSアカウント
- [作品一覧](${siteUrl}/works): ${works.length}件
- [記事一覧](${siteUrl}/articles): ${articleList.length}件

## 作品

${workLines.join("\n")}

## 記事

${articleLines.join("\n")}

## API

- [OpenAPI仕様](https://api.newt239.dev/docs/openapi.json): api.newt239.devのREST API。人間向けのドキュメントは https://api.newt239.dev/docs
- [MCPサーバー](https://api.newt239.dev/mcp): Streamable HTTP。Annictの視聴ライブラリとSpotifyのトップトラックを取得できる

## Optional

- [プライバシーポリシー](${siteUrl}/privacy)
`;

await writeFile(OUTPUT_FILE, content, "utf8");

console.log(`llms.txt を生成しました（作品 ${works.length} 件 / 記事 ${articleList.length} 件）。`);
