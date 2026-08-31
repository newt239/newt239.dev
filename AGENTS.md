# AGENTS.md

このファイルは AI Agents がこのリポジトリで作業する際の具体的なガイダンスを提供します。

ユーザーとのコミュニケーションやコミットメッセージ、コメント、ログ、ドキュメントは**すべて日本語で記述**してください。

コミットメッセージは prefix を含めて**1 行以内**で簡潔に記述してください。本文や補足行は付けません。

コードコメントは**原則として記載しない**でください。コードから読み取れない制約を伝えるために真に必要な場合に限り、最小限のコメントのみ許可します。

エラーを**握りつぶす実装は禁止**です（空の catch ブロックや `catch(() => {})` など）。ログを出力するだけの catch も同様に不可です。エラーの性質を見極めて次のように設計してください:

- 仕様上想定された回復可能な reject（例: View Transition のアニメーションスキップ）は例外扱いせず、正常系の制御フローとして設計する
- 想定外のエラーはその場で捕捉せず、呼び出し元やフレームワークのエラーハンドラへ伝播させる
- 失敗時にも必要な状態復元・クリーンアップは `finally` で保証する

関数は**アロー関数**で定義してください。

**関数を不用意に増やさない**でください。次に当てはまるものはインライン化を検討します:

- 3 行以下の関数
- 3 回以下しか呼ばれていない関数

とりわけ、**テストを書くためだけに処理を関数へ切り出すことは禁止**です。テストは公開されているインターフェースに対して書き、内部実装は呼び出し側に展開したままにしてください。

ファイル名は中身と一致させてください。`constants.ts` のような名前のファイルに関数を置かず、責務に応じた名前のモジュールへ配置します。

## プロジェクト概要

Nuxt 4 で構築された個人のポートフォリオサイトです。日本語話者向けに設計されており（lang: "ja"）、Cloudflare Pages にデプロイされています。

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

# CSS のリント
bun run lint:css

# CSS のリントと自動修正
bun run lint:css:fix

# content 配下の Markdown の文章チェック
bun run lint:text

# public/images の画像を WebP へ圧縮
bun run compress

# OG 画像の生成（作品の追加・タイトル・期間・画像を変更したら実行する）
bun run og

# .output/public を localhost:3100 で配信（アクセシビリティ検査用）
bun run serve:static

# axe によるアクセシビリティ検査（serve:static を起動した状態で実行する）
bun run a11y
```

`CLAUDE.md` は `AGENTS.md` へのシンボリックリンクです。編集は `AGENTS.md` に対して行い、実ファイルへ置き換えないでください。

## アーキテクチャ

### コンテンツ管理

- **Nuxt Content v3** を使用してポートフォリオ作品を管理
- 作品は `content/works/` 内に frontmatter メタデータ付きの Markdown ファイルとして保存
- [content.config.ts](content.config.ts) でコンテンツスキーマが定義されており、以下のフィールドが必須:
 - `images`（1件以上の `src`/`alt` の配列。先頭がサムネイル・OG 画像に使われる）, `tech`, `period`。任意で `order`, `github`
- OG 画像は [scripts/generate-og-images.ts](scripts/generate-og-images.ts) が `public/og/` へ生成する。CI ではなくローカルで `bun run og` を実行し、生成物ごとコミットして push する
- 生成にはローカルの `~/Library/Fonts/FOT-UDKakugo_LargePr6N-{R,B}.otf` を使う。Adobe Fonts で同期していない環境ではスクリプトが失敗する
- Nuxt Content で管理するのは `content/works/` の作品だけ。それ以外のデータは `libs/` の型付き TS モジュールに置く。日付は `YYYY-MM-DD` または `YYYY-MM` の文字列で持つ
  - [libs/articles.ts](libs/articles.ts) - 外部ブログ（Zenn、Qiita、はてなブログなど）へのリンク
  - [libs/timeline.ts](libs/timeline.ts) - 経歴。年ごとのグルーピングは [Timeline.vue](components/Timeline.vue) の computed で行う
  - [libs/certifications.ts](libs/certifications.ts) - 資格
- 並び順は配列の記述順に依存させず、使う側で日付の降順に並べ替える

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
- 色は必ず `:root` のトークン経由で指定する。固定値を書くと AI テーマ生成に追従しない
- 本文に載る文字色は `--text` / `--text-muted` / `--accent` / `--accent-dark` から選ぶ。これらは [libs/theme.ts](libs/theme.ts) の `themeConstraints` で `--bg` と `--surface` に対し 4.5:1 が保証されている。`--text-faint` と `--highlight` は 3:1 なので装飾用にとどめる
- コードブロックの配色は [libs/shiki-theme.ts](libs/shiki-theme.ts) の Shiki テーマが `--code-*` トークン経由で参照する。Shiki の組み込みテーマは固定 hex を出力しテーマ追従しないため使わない
- [stylelint.config.mjs](stylelint.config.mjs) で次を強制する。`bun run lint:css:fix` で直せるものは自動で直る
  - 長さは rem で 0.25 の倍数のみ。`0.875rem` のような中間値は使わない
  - `font-weight` は `400` と `800` のみ。Typekit の kit が R / B の 2 ウェイトしか持たないため
  - Baseline widely available の範囲で書く。未到達の機能を使うときは `@supports` で囲むか、`stylelint.config.mjs` の `plugin/use-baseline` の ignore に追加して意図を残す
  - プロパティの並び順は `stylelint-config-recess-order`

### 主要機能

- **テーマ生成**: [ThemeChanger.vue](components/ThemeChanger.vue) は AI を使用してユーザーのプロンプトから CSS カスタムプロパティを生成（`api.newt239.dev/ai/generate-theme` 経由）
- **View Transitions**: [nuxt.config.ts](nuxt.config.ts) の `experimental.viewTransition` で有効化
- **ページトランジション**: [app.vue](app.vue) でブラー + 不透明度のカスタムトランジション
- **アナリティクス**: [plugins/vue-gtag.client.ts](plugins/vue-gtag.client.ts) で vue-gtag-next を使用した Google Analytics
  - 計測するのは `newt239.dev` を開いた実ブラウザだけ。localhost とプレビューデプロイ、`navigator.webdriver` が立つ自動化ブラウザ、ヘッドレスやボットの UA では gtag.js を読み込まない
  - `?analytics=off` を付けてアクセスすると `analytics=off` の Cookie を保存し、そのブラウザで恒久的に計測を止める。`?analytics=on` で解除する。Claude in Chrome のように実ブラウザを操作する AI Agent はこれで除外する
- **Adobe Fonts**: [nuxt.config.ts](nuxt.config.ts) の `app.head.script` で Typekit を読み込み

### SEO メタ

- サイト共通のデフォルト（title、og:title、og:image、twitter:*）は [nuxt.config.ts](nuxt.config.ts) の `app.head` に静的に置く
- ページ固有の値は各ページの `useSeoMeta` で設定する。ミドルウェアからは設定しない（クライアントでしか動かずプリレンダ HTML に載らない）
- canonical と og:url はパスに依存するため [app.vue](app.vue) で `useRoute()` から組み立てる
- `description` はサイト共通・ページ共通ともに設定していない。作品詳細のみ `content/works/*.md` の frontmatter の値が入る

### CI

- [lint.yml](.github/workflows/lint.yml) - PR で `bun run build` / `tsc` / ESLint / Stylelint / textlint
- [quality.yml](.github/workflows/quality.yml) - PR と手動実行で `bun run generate` してから Lighthouse CI と axe
  - しきい値は [lighthouserc.json](lighthouserc.json)。`meta-description` と `robots-txt` は off にしている（description を持たない方針と、`robots.txt` の Content-Signal 行を Lighthouse が不明なディレクティブとみなすため）
  - axe と Lighthouse が見るのは**デフォルトテーマだけ**。AI 生成テーマのコントラストは `themeConstraints` を通じてサーバー側（api.newt239.dev）が検証する
- [cloudflare-pages.yml](.github/workflows/cloudflare-pages.yml) - 週次 cron でデプロイ

### デプロイ

- Cloudflare Pages（SSG モード）向けに設定
- [.github/workflows/cloudflare-pages.yml](.github/workflows/cloudflare-pages.yml) が週次 cron（毎週月曜 0 時）で `bun run generate` してから `wrangler pages deploy dist` する。main への push では走らない
- `nitro.compressPublicAssets` でアセット圧縮を有効化

## 言語とコードレビューの方針

[.github/copilot-instructions.md](.github/copilot-instructions.md) より:

- 日本語で回答してください
- レビューコメントは以下のプレフィックスを使用: `[must]`（必須）、`[recommend]`（推奨）、`[nits]`（軽微）
- 重点チェック項目: セキュリティ、パフォーマンス、可読性、保守性、テストカバレッジ、言語固有のベストプラクティス
