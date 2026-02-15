# AGENTS.md

このファイルは AI Agents がこのリポジトリで作業する際の具体的なガイダンスを提供します。

ユーザーとのコミュニケーションやコミットメッセージ、コメント、ログ、ドキュメントは**すべて日本語で記述**してください。

## プロジェクト概要

Nuxt 3 で構築された個人のポートフォリオサイトです。日本語話者向けに設計されており（lang: "ja"）、Cloudflare Pages にデプロイされています。

## 開発コマンド

```bash
# 開発サーバーを起動
bun dev

# 本番用ビルド
bun run build

# 静的サイト生成
bun run generate

# 本番ビルドのプレビュー
bun run preview

# コードのリント
bun run lint

# リントと自動修正
bun run lint:fix
```

## アーキテクチャ

### コンテンツ管理

- **Nuxt Content v3** を使用してポートフォリオ作品を管理
- 作品は `content/works/` 内に frontmatter メタデータ付きの Markdown ファイルとして保存
- [content.config.ts](content.config.ts) でコンテンツスキーマが定義されており、以下のフィールドが必須:
 - `images`（1件以上の `src`/`alt` の配列。先頭がサムネイル・OG 画像に使われる）, `tech`, `period`, `github`。任意で `order`
- 記事は [libs/articles.ts](libs/articles.ts) でハードコードされたリストとして管理され、外部ブログ（Zenn、Qiita、はてなブログ）へのリンクを保持

### ルーティングとページ構成

- `pages/` 内のファイルベースルーティング:
  - `index.vue` - ホームページ
  - `about.vue` - プロフィールページ
  - `privacy.vue` - プライバシーポリシー
  - `articles/index.vue` - 記事一覧
  - `works/index.vue` - 作品一覧
  - `works/[...slug].vue` - `queryCollection('works')` を使用した動的な作品詳細ページ

### スタイリング

- [assets/styles/main.css](assets/styles/main.css) に CSS カスタムプロパティを使用したグローバルスタイルを配置
- `.vue` ファイル内にコンポーネントスコープのスタイル
- テーマ用の CSS 変数（`ThemeChanger` コンポーネント経由で動的に変更可能）
- アクセシビリティ重視: focus-visible 状態、prefers-reduced-motion 対応

### 主要機能

- **テーマ生成**: [ThemeChanger.vue](components/ThemeChanger.vue) は AI を使用してユーザーのプロンプトから CSS カスタムプロパティを生成（`api.newt239.dev/ai/generate-theme` 経由）
- **View Transitions**: [nuxt.config.ts](nuxt.config.ts) の `experimental.viewTransition` で有効化
- **ページトランジション**: [app.vue](app.vue) でブラー + 不透明度のカスタムトランジション
- **アナリティクス**: [plugins/vue-gtag.client.ts](plugins/vue-gtag.client.ts) で vue-gtag-next を使用した Google Analytics
- **Adobe Fonts**: [layouts/default.vue](layouts/default.vue) で Typekit を読み込み

### コンポーネント構成

`components/` 内のコンポーネント:

- `Header.vue` / `Footer.vue` - レイアウトコンポーネント
- `Profile.vue` / `Timeline.vue` - About ページのセクション
- `ArticleItem.vue` / `LatestArticleList.vue` - 記事表示
- `WorkItem.vue` / `FeaturedWorkList.vue` - 作品表示
- `MyTopTrackList.vue` - Spotify 連携
- `ThemeChanger.vue` - AI テーマ生成

### デプロイ

- Cloudflare Pages（SSG モード）向けに設定
- [wrangler.toml](wrangler.toml) で Cloudflare D1 データベースバインディング
- `nitro.compressPublicAssets` でアセット圧縮を有効化

## 言語とコードレビューの方針

[.github/copilot-instructions.md](.github/copilot-instructions.md) より:

- 日本語で回答してください
- レビューコメントは以下のプレフィックスを使用: `[must]`（必須）、`[recommend]`（推奨）、`[nits]`（軽微）
- 重点チェック項目: セキュリティ、パフォーマンス、可読性、保守性、テストカバレッジ、言語固有のベストプラクティス
