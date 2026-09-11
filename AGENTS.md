# AGENTS.md

このファイルは AI Agents がこのリポジトリで作業する際の具体的なガイダンスを提供します。

ユーザーとのコミュニケーションやコミットメッセージ、コメント、ログ、ドキュメントは**すべて日本語で記述**してください。

コミットメッセージは prefix を含めて**1 行以内**で簡潔に記述してください。本文や補足行は付けません。

コードコメントは**原則として記載しない**でください。コードから読み取れない制約を伝えるために真に必要な場合に限り、最小限のコメントのみ許可します。

エラーを**握りつぶす実装は禁止**です（空の catch ブロックや `catch(() => {})` など）。ログを出力するだけの catch も同様に不可です。エラーの性質を見極めて次のように設計してください:

- 仕様上想定された回復可能な reject（例: View Transition のアニメーションスキップ）は例外扱いせず、正常系の制御フローとして設計する
- 想定外のエラーはその場で捕捉せず、呼び出し元やフレームワークのエラーハンドラへ伝播させる
- 失敗時にも必要な状態復元・クリーンアップは `finally` で保証する

本番サイト <https://newt239.dev> をブラウザで開くときは、必ず `?analytics=off` を付けた URL から開始してください。Claude in Chrome はページ側から検出できないため、これを忘れるとデバッグ操作が Google Analytics に記録されます。同じタブ内で遷移する限り 1 回付ければ足ります。

関数は**アロー関数**で定義してください。

**関数を不用意に増やさない**でください。次に当てはまるものはインライン化を検討します:

- 3 行以下の関数
- 3 回以下しか呼ばれていない関数

とりわけ、**テストを書くためだけに処理を関数へ切り出すことは禁止**です。テストは公開されているインターフェースに対して書き、内部実装は呼び出し側に展開したままにしてください。

ファイル名は中身と一致させてください。`constants.ts` のような名前のファイルに関数を置かず、責務に応じた名前のモジュールへ配置します。

## プロジェクト概要

Nuxt 4 で構築された個人のポートフォリオサイトです。日本語話者向けに設計されており（lang: "ja"）、Cloudflare Workers にデプロイされています。

## 開発コマンド

```bash
# 開発サーバーを起動
pnpm dev

# 本番用ビルド
pnpm run build

# 型チェック
pnpm run typecheck

# 静的サイト生成
pnpm run generate

# 本番ビルドのプレビュー
pnpm run preview

# コードのリント
pnpm run lint

# リントと自動修正
pnpm run lint:fix

# CSS のリント
pnpm run lint:css

# CSS のリントと自動修正
pnpm run lint:css:fix

# content 配下の Markdown の文章チェック
pnpm run lint:text

# public/images の画像を WebP へ圧縮
pnpm run compress

# OG 画像の生成（作品の追加・タイトル・期間・画像を変更したら実行する）
pnpm run og

# .output/public を localhost:3100 で配信（アクセシビリティ検査用）
pnpm run serve:static

# axe によるアクセシビリティ検査（serve:static を起動した状態で実行する）
pnpm run a11y
```

パッケージマネージャは **pnpm**、ランタイムは **Node.js** です。`npm` / `yarn` / `bun` は使いません。バージョンは [mise.toml](mise.toml) と `package.json` の `packageManager` / `devEngines.runtime` で固定しています。

pnpm の設定は [pnpm-workspace.yaml](pnpm-workspace.yaml) に置きます。`.npmrc` は使いません。

- `saveExact` でバージョンを完全固定する
- `minimumReleaseAge` が 10080 分（7 日）なので、リリース直後のバージョンはインストールされない
- postinstall を走らせる依存は `allowBuilds` に明示する。追加を怠ると `ERR_PNPM_IGNORED_BUILDS` で install が失敗する

`scripts/` の TypeScript は Node のネイティブ実行（型の除去）で動かします。**相対 import には `.ts` 拡張子が必須**です。省略すると `ERR_MODULE_NOT_FOUND` になります。

`CLAUDE.md` は `AGENTS.md` へのシンボリックリンクです。編集は `AGENTS.md` に対して行い、実ファイルへ置き換えないでください。

## アーキテクチャ

### コンテンツ管理

- **Nuxt Content v3** を使用してポートフォリオ作品を管理
- 作品は `content/works/` 内に frontmatter メタデータ付きの Markdown ファイルとして保存
- [content.config.ts](content.config.ts) でコンテンツスキーマが定義されており、以下のフィールドが必須:
 - `images`（1件以上の `src`/`alt` の配列。先頭がサムネイル・OG 画像に使われる）, `tech`, `period`。任意で `order`, `github`
- OG 画像は [scripts/generate-og-images.ts](scripts/generate-og-images.ts) が `public/og/` へ生成する。CI ではなくローカルで `pnpm run og` を実行し、生成物ごとコミットして push する
- 生成にはローカルの `~/Library/Fonts/FOT-UDKakugo_LargePr6N-{R,B}.otf` を使う。Adobe Fonts で同期していない環境ではスクリプトが失敗する
- Nuxt Content で管理するのは `content/works/` の作品だけ。それ以外のデータは `libs/` の型付き TS モジュールに置く。日付は `YYYY-MM-DD` または `YYYY-MM` の文字列で持つ
  - [libs/articles.ts](libs/articles.ts) - 外部ブログ（Zenn、Qiita、はてなブログなど）へのリンク
  - [libs/timeline.ts](libs/timeline.ts) - 経歴。年ごとのグルーピングは [Timeline.vue](components/Timeline.vue) の computed で行う
  - [libs/certifications.ts](libs/certifications.ts) - 資格
  - [libs/person.ts](libs/person.ts) - JSON-LD の Person とその `@id`。`sameAs` は `libs/links.ts` から組み立てる
  - [libs/links.ts](libs/links.ts) - 外部リンクの名前・ハンドル・URL。Profile・Footer・about・`person.sameAs` はすべてここを参照し、URL を直書きしない。アイコンは Vue コンポーネントなので各コンポーネント側に置く
  - [libs/site.ts](libs/site.ts) - `siteUrl` と `siteName`。URL やサイト名を文字列で直書きせずここから参照する
  - [libs/period.ts](libs/period.ts) - 作品の `period`（`YYYY.MM - YYYY.MM`）を表示用に整形する。OG 画像生成でも使う
- 並び順は配列の記述順に依存させず、使う側で日付の降順に並べ替える
- 日付の表示は `toLocaleDateString("ja-JP", …)` を使い、`timeZone: "UTC"` を必ず指定する。指定しないと `YYYY-MM` の UTC 解釈と実行環境のタイムゾーンがずれて月が1つ戻る。`slice` と `Number` で組み立てない

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
- 16:9 のサムネイルを持つカードは `main.css` の `.thumb-card` / `.thumb-card-image` / `.thumb-card-body` / `.thumb-card-title` / `.thumb-card-text` を使う。見出しは要素セレクタに頼らず `.thumb-card-title` を直接付ける。付けないと `h1, h2` などのグローバル規則に負ける
- **`main.css` の共通クラスは単一クラスセレクタのままにする。** scoped CSS は Vite のチャンク分割次第で `entry.css` の前にも後ろにも出るため、同詳細度の勝敗がビルドごとに反転する。`main.css` 側に `.thumb-card-image.foo` のような2クラスの規則を足すと、コンポーネントの `.thumb-card-image[data-v]` と同点になって壊れる。共通クラスとコンポーネント側で同じプロパティを奪い合わせない
- [stylelint.config.mjs](stylelint.config.mjs) で次を強制する。`pnpm run lint:css:fix` で直せるものは自動で直る
  - 長さは rem で 0.25 の倍数のみ。`0.875rem` のような中間値は使わない
  - `font-weight` は `400` と `800` のみ。Typekit の kit が R / B の 2 ウェイトしか持たないため
  - Baseline widely available の範囲で書く。未到達の機能を使うときは `@supports` で囲むか、`stylelint.config.mjs` の `plugin/use-baseline` の ignore に追加して意図を残す
  - プロパティの並び順は `stylelint-config-recess-order`

### 主要機能

- **テーマ生成**: [ThemeChanger.vue](components/ThemeChanger.vue) は AI を使用してユーザーのプロンプトから CSS カスタムプロパティを生成（`api.newt239.dev/ai/generate-theme` 経由）
- **View Transitions**: [nuxt.config.ts](nuxt.config.ts) の `experimental.viewTransition` で有効化
- **ページトランジション**: View Transition 非対応ブラウザ向けのフォールバック。[middleware/page-transition.global.ts](middleware/page-transition.global.ts) が `document.startViewTransition` の無いときだけ Vue の `pageTransition` を有効化し、[app.vue](app.vue) の `@supports not (view-transition-name: none)` 内でブラー + 不透明度を定義する
- **スクロール復元**: [app/router.options.ts](app/router.options.ts) は Nuxt 既定の `scrollBehavior` とほぼ同じだが、View Transition のスナップショット取得より前にスクロール位置を確定させるため rAF を挟まない（PR #119）。Nuxt 側の改善に追従する際はこの差分だけを維持する
- **一覧のフィルタとソート**: [composables/useListControls.ts](composables/useListControls.ts) が URL クエリと下書き状態の同期、適用時の View Transition を担う。[usePageSeo.ts](composables/usePageSeo.ts) はページ固有の title / og:image を設定する
- **アナリティクス**: [plugins/vue-gtag.client.ts](plugins/vue-gtag.client.ts) で vue-gtag-next を使用した Google Analytics
  - 計測するのは `newt239.dev` を開いた実ブラウザだけ。localhost とプレビューデプロイ、`navigator.webdriver` が立つ自動化ブラウザ、ヘッドレスやボットの UA では gtag.js を読み込まない
  - `?analytics=off` を付けてアクセスすると `sessionStorage` にオプトアウトを記録する。同じタブ内ならフルページ遷移を跨いでも維持され、別タブとタブを閉じたあとには影響しない。`?analytics=on` で解除する
  - Claude in Chrome は `navigator.webdriver` が false で UA も通常の Chrome と同一のため、ページ側から自動検出できない。上のオプトアウトで除外する
- **Adobe Fonts**: [nuxt.config.ts](nuxt.config.ts) の `app.head.script` で Typekit を読み込み

### SEO メタ

- サイト共通のデフォルト（title、og:title、og:image、twitter:*）は [nuxt.config.ts](nuxt.config.ts) の `app.head` に静的に置く
- ページ固有の値は各ページの `useSeoMeta` で設定する。ミドルウェアからは設定しない（クライアントでしか動かずプリレンダ HTML に載らない）
- canonical と og:url はパスに依存するため [app.vue](app.vue) で `useRoute()` から組み立てる
- `description` はサイト共通・ページ共通ともに設定していない。作品詳細のみ `content/works/*.md` の frontmatter の値が入る

### CI

- [lint.yml](.github/workflows/lint.yml) - PR で `pnpm run build` / `typecheck` / ESLint / Stylelint / textlint
- [quality.yml](.github/workflows/quality.yml) - PR と手動実行で `pnpm run generate` してから Lighthouse CI と axe
  - しきい値は [lighthouserc.json](lighthouserc.json)。`meta-description` と `robots-txt` は off にしている（description を持たない方針と、`robots.txt` の Content-Signal 行を Lighthouse が不明なディレクティブとみなすため）
  - axe と Lighthouse が見るのは**デフォルトテーマだけ**。AI 生成テーマのコントラストは `themeConstraints` を通じてサーバー側（api.newt239.dev）が検証する
- [cloudflare-workers.yml](.github/workflows/cloudflare-workers.yml) - 週次 cron と手動実行でデプロイ

### デプロイ

- Cloudflare Workers の静的アセット（Workers Static Assets）に SSG の出力を載せている。Worker スクリプトは持たず、[wrangler.jsonc](wrangler.jsonc) の `assets` だけで配信する
- `assets.directory` は `dist` ではなく `.output/public` を指す。`dist` は `nuxt generate` が張る絶対パスのシンボリックリンクで、CI 環境で辿れる保証がない
- `assets.html_handling` と `assets.not_found_handling` は明示する。Pages は `404.html` を暗黙に使うが Workers は設定しないと汎用の 404 を返す。`nitro.prerender.autoSubfolderIndex: false` により `about.html` 形式で出力されるため、`auto-trailing-slash` が Pages と同じ URL 解決になる
- `/about/` のような末尾スラッシュ付きの URL は `/about` へリダイレクトされるが、Pages の 308 に対し Workers は 307 を返す。仕様差であり回避手段はない
- `newt239.dev` は Workers Route（`newt239.dev/*`）で配信する。Workers Route は origin より前に実行されるため、Pages 側のカスタムドメインを残したまま無停止で切り替えられ、route を外せば Pages の配信に戻る。カスタムドメインとして登録し直すと Pages 側から先に外す必要があり、その間ダウンタイムが出る
- デプロイは [.github/workflows/cloudflare-workers.yml](.github/workflows/cloudflare-workers.yml) だけが行う。週次 cron（毎週月曜 0 時）と手動実行で `pnpm run generate` してから `wrangler deploy` する。Cloudflare 側の Git 連携は使っていないため、main への push では走らない
- `nitro.compressPublicAssets` は使わない。Workers Static Assets は事前圧縮ファイルを利用せず自前で圧縮するため、`.br` / `.gz` はアップロード対象が増えるだけの無駄になる
- `public/_headers` は Workers Static Assets でもそのまま解釈される。ファイル自体は配信されない

## 言語とコードレビューの方針

[.github/copilot-instructions.md](.github/copilot-instructions.md) より:

- 日本語で回答してください
- レビューコメントは以下のプレフィックスを使用: `[must]`（必須）、`[recommend]`（推奨）、`[nits]`（軽微）
- 重点チェック項目: セキュリティ、パフォーマンス、可読性、保守性、テストカバレッジ、言語固有のベストプラクティス
