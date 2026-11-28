# AGENTS.md

AI Agents がこのリポジトリで作業するときのガイダンス。

## 基本ルール

- ユーザーとのやりとり、コミットメッセージ、コメント、ログ、ドキュメントはすべて日本語で書く
- コミットメッセージは prefix 込みで 1 行。本文や補足行は付けない
- コードコメントは原則書かない。コードから読み取れない制約だけ、最小限に書く
- エラーの握りつぶしは禁止（空の catch、`catch(() => {})`、ログだけの catch）
  - 仕様上想定された回復可能な reject（例: View Transition のスキップ）は、正常系の制御フローとして書く
  - 想定外のエラーは捕捉せず、呼び出し元やフレームワークへ伝播させる
  - 失敗時に必要な復元やクリーンアップは `finally` で保証する
- 本番 <https://newt239.dev> をブラウザで開くときは `?analytics=off` 付きの URL から始める（同じタブ内なら 1 回でよい）
- 関数はアロー関数で定義する
- 関数を不用意に増やさない。3 行以下、または呼び出しが 3 回以下の関数はインライン化を検討する。テストのためだけに切り出すことは禁止で、テストは公開インターフェースに対して書く
- ファイル名は中身と一致させる

## プロジェクト概要

Nuxt 4 製の個人ポートフォリオ。SSG の出力を Cloudflare Workers に載せて配信している。

## 開発コマンド

基本のスクリプトは `package.json` を参照。

- `pnpm run lint:text` は `pnpm run lint` に含まれない。content 配下を変えたら実行する
- `pnpm run content`（OG 画像、llms.txt、リンクカード）と `pnpm run icons` はローカルで実行し、生成物ごとコミットする
  - リンクカードは未取得の URL だけ取りに行く。取り直すときは `node scripts/generate-link-cards.ts --refresh`
- pnpm と Node のバージョンは `package.json` の `packageManager` と `devEngines.runtime` だけで固定する

## コンテンツとデータ

- 作品（`content/works/`）の `images` の先頭がサムネイル兼 OG 画像になる
- 作品の本文の見出しは `##` から書く
- 作品の「リンク」節は `::link-card{url="…"}` でカードにする。取得できないリンク（bot を弾く、リンク切れ）はテキストリンクのまま残す
- OG 画像の生成には `~/Library/Fonts/FOT-UDKakugo_LargePr6N-{R,B}.otf` が必要（Adobe Fonts の同期）
- 外部リンクの URL と `siteUrl` / `siteName` は直書きせず、[links.ts](app/lib/links.ts) と [constants.ts](app/lib/constants.ts) を参照する
- 並び順は配列の記述順に頼らず、使う側で日付の降順に並べ替える
- 日付の表示は `toLocaleDateString("ja-JP", { timeZone: "UTC", … })` で行う。`timeZone` を省くと月が 1 つずれる

## スタイリング

- `main.css` の既定スタイルは `@layer base` / `@layer components` に入れ、コンポーネントの CSS はレイヤー外に置く
  - コンポーネントでは `@layer` を書かない。SSR のインライン `<style>` が `entry.css` より前に出るため、レイヤーの順序が崩れる
  - トークン、利用者設定（`prefers-contrast` / `forced-colors` / `print`）の上書き、`.visually-hidden`、`::view-transition-*` はレイヤー外に置く
- 色は必ず `:root` のトークン経由で指定する。固定値では AI テーマに追従しない（[ImageLightbox.vue](app/components/gallery/ImageLightbox.vue) のオーバーレイだけは例外）
- 11 トークンすべてを sRGB ガマット内に保つ。外れるとコントラストの実測が宣言値と食い違う
- 本文の文字色は `--text` / `--text-muted` / `--accent` / `--accent-dark` から選ぶ。`--text-faint` と `--highlight` は 3:1 なので装飾用にとどめる
- ダークモード
  - ダークの `:root` は `@media (display-mode: standalone)` より前に置く。後ろに置くと AccentColor 追随が負ける
  - ダークでは `--accent-dark` が明るい方のアクセントになる。`--code-accent` が `--surface` に対し 4.5:1 を要するための意図的な反転
  - ダークパレットは CI で検査されないので、変えたら `themeConstraints` の 14 件を手動で実測する
- **`--bg` を変えたら次をすべて直す**：`:root`、ダークの `:root`、standalone の 2 系統（ダークは `color-mix()` の第 2 引数のリテラル）、[manifest.webmanifest](public/manifest.webmanifest) の `theme_color` / `background_color`、[nuxt.config.ts](nuxt.config.ts) の `theme-color` メタ 2 本
- 幅と列数は `.card-grid` のトラック（`--grid-track-max` と `--grid-gap`）とそのコンテナクエリに揃える。auto-fit で決めない
- 段組みやカードは `main.css` の `@layer components` にある共通クラスを使う
- scoped な `<style>` で at-rule を二重にネストしない（`@media { @container { … } }`）。直下の宣言から `data-v` 属性が落ちる
- 他社ロゴは公式配布の黒版と白版を `.logo-light` / `.logo-dark` で切り替える。テーマ色で塗るとブランドガイドラインの改変禁止に反する
- `font-weight` は `400` と `800` のみ（Typekit の kit が 2 ウェイトしか持たない）

## 主要機能

- **テーマ生成**：ガマットマッピングとコントラスト検証は api.newt239.dev 側が担う
- **作品画像のジェスチャ**（[ImageLightbox.vue](app/components/gallery/ImageLightbox.vue)）
  - `.lightbox-content` の `touch-action: none` を緩めない。ブラウザのピンチと `transform` の二重管理になる
  - ハンドラは画像ではなく `.lightbox-content` に付ける。2 本目の指はレターボックスに降りるため
  - `setPointerCapture` は拡大中に画像上で押されたときだけ呼ぶ。等倍で呼ぶと、タップでライトボックスが閉じる
  - 単一ポインタの代替（± ボタン、パンボタン、前後ボタン）は消さない（SC 2.5.1 / 2.5.7）
- **Adobe Fonts**：kit は `nuxt.config.ts` の `fontLoaderScript` で読み込む。`onload` 属性は CSP で弾かれるので、ハンドラはスクリプト内で代入する
- **入場の演出**：`v-reveal` はカードやパネル（`.section-body`）、リストの行（`.record-item`）の単位で付ける。セクション全体だと大味になり、背景を共有するパネル内の行に付けると背景だけが先に見える。View Transitions はライトボックスの開閉だけで使う

## SEO メタ

- サイト共通のデフォルトは `nuxt.config.ts` の `app.head` に置き、ページ固有の値は各ページの `useSeoMeta` で設定する（ミドルウェアではプリレンダに載らない）
- `description` を設定するのはトップと作品詳細だけ
- **Discord Component Embed**（[useDiscordEmbed.ts](app/composables/useDiscordEmbed.ts)）
  - 仕様の制約は [check-discord-embeds.ts](scripts/check-discord-embeds.ts) がビルド時に検証する
  - 作品の公開 URL は frontmatter の `url` に書く
  - メディアの `url` は `/` 始まりのパスで渡す。非本番ブランチではプレビューのホストに解決される

## PWA

- `display` は `standalone` から変えない。AccentColor 追随の `@media (display-mode: standalone)` が効かなくなる
- `public/icon.png` を差し替えたら、`maskable` の縮小率（72%）がセーフゾーンに収まるか見直す

## セキュリティヘッダ

[public/_headers](public/_headers) の `/*` で CSP などを返す（Observatory A+）。

- インラインスクリプトを足したら、[write-csp-script-hashes.ts](scripts/write-csp-script-hashes.ts) の対象に加える
- `style-src 'unsafe-inline'` は残す（Observatory で満点扱い）
- フォントが適用されるかはローカルで判定しない（Chrome の HTTP キャッシュがポートをまたいで共有される）。プレビューデプロイで `html` の `wf-active` / `wf-inactive` を見る
- 検証は `pnpm run generate` のあと `pnpm exec wrangler dev` で行う（`serve:static` は `_headers` を解釈しない）

## エージェント向けディスカバラビリティ

- レスポンスヘッダは `_headers` でしか付けられない
- [api-catalog](public/.well-known/api-catalog) は RFC 9264 に従い、リレーション名をオブジェクトのキーにする（`links` 配列ではない）
- [server-card.json](public/.well-known/mcp/server-card.json) は、api.newt239.dev の MCP サーバーの `initialize` 応答に合わせる
- [robots.txt](public/robots.txt) の `Content-Signal: ai-train=no` と学習クローラの Disallow は維持する

## CI

- アクセシビリティの検査は Lighthouse CI の `categories:accessibility`（`minScore: 1`）だけで、ライトの既定テーマしか見ない
- [lighthouserc.json](lighthouserc.json) で `meta-description`（description を持たない方針のため）と `robots-txt`（Content-Signal が不明なディレクティブ扱いになるため）を off にしている
- [cloudflare-workers.yml](.github/workflows/cloudflare-workers.yml) の週次デプロイは Spotify の My Top Tracks を更新するため
- @nuxt/a11y のビルド時レポートは npm で公開されたら `a11y.report` で有効にする（issue #156）

## デプロイ

- Workers Static Assets で配信する。手元からデプロイするときは `.output/public` を使う（`dist` には古いビルドが残る）
- `newt239.dev/*` は Workers Route で配信する。カスタムドメインへ切り替えるとダウンタイムが出る。route を外せば、ロールバック先として残してある Pages の配信に戻る
- Workers Builds が push ごとにビルドし、main は本番、それ以外のブランチはプレビューへ出す
