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
- ファイル名は中身と一致させる（`constants.ts` に関数を置かない）

## プロジェクト概要

Nuxt 4 製の個人ポートフォリオ（lang: "ja"）。SSG の出力を Cloudflare Workers に載せて配信している。

## 開発コマンド

基本のスクリプトは `package.json` を参照。条件付きで実行するものは次のとおり。

```bash
pnpm run lint:text     # content 配下の Markdown の文章チェック
pnpm run compress      # public/images を WebP へ圧縮
pnpm run og            # OG 画像の生成（作品の追加、タイトル・期間・画像の変更時）
pnpm run llms          # llms.txt の生成（作品または libs/articles.ts の変更時）
pnpm run icons         # PWA アイコンの生成（public/icon.png の差し替え時）
pnpm run serve:static  # .output/public を localhost:3100 で配信（PWA スクリーンショット用）
```

`og` / `llms` / `icons` は CI では実行しない。ローカルで実行し、生成物ごとコミットする。

- pnpm と Node.js を使う。`npm` / `yarn` / `bun` は使わない
- バージョンは `package.json` の `packageManager` と `devEngines.runtime` だけで固定する。`.node-version` や `mise.toml` は置かない
- pnpm の設定は [pnpm-workspace.yaml](pnpm-workspace.yaml) に置く（`.npmrc` は使わない）
  - `saveExact` で完全固定する。`minimumReleaseAge` は 7 日
  - postinstall を持つ依存は `allowBuilds` に足す。足さないと `ERR_PNPM_IGNORED_BUILDS` になる
- `scripts/` の TS は Node のネイティブ実行で動く。相対 import には `.ts` 拡張子が必須

## コンテンツとデータ

- Nuxt Content v3 で管理するのは `content/works/` の作品だけ。スキーマは [content.config.ts](content.config.ts)
  - 必須は `images`（1 件以上、先頭がサムネイル兼 OG 画像）、`tech`、`period`。任意は `order`、`github`、`description`
- OG 画像は [scripts/generate-og-images.ts](scripts/generate-og-images.ts) で生成する。`~/Library/Fonts/FOT-UDKakugo_LargePr6N-{R,B}.otf` が必要（Adobe Fonts の同期）
- `public/llms.txt` は [scripts/generate-llms-txt.ts](scripts/generate-llms-txt.ts) が作品と [libs/articles.ts](libs/articles.ts) から生成する
- 作品以外のデータは `libs/` の型付き TS モジュールに置く。日付は `YYYY-MM-DD` または `YYYY-MM` の文字列
  - [articles.ts](libs/articles.ts) は外部ブログ、[timeline.ts](libs/timeline.ts) は経歴（年ごとの集計は [Timeline.vue](components/Timeline.vue) で行う）、[certifications.ts](libs/certifications.ts) は資格
  - [person.ts](libs/person.ts) は JSON-LD の Person（`sameAs` は links から組み立てる）
  - [links.ts](libs/links.ts) は外部リンク。URL を直書きせずここを参照する（アイコンは各コンポーネント側）
  - [site.ts](libs/site.ts) は `siteUrl` / `siteName`。直書きしない
  - [period.ts](libs/period.ts) は `period` の表示整形（OG 画像生成でも使う）
- 並び順は配列の記述順に頼らず、使う側で日付の降順に並べ替える
- 日付の表示は `toLocaleDateString("ja-JP", { timeZone: "UTC", … })` で行う。`timeZone` を省くと月が 1 つずれる。`slice` と `Number` で組み立てない

## スタイリング

- グローバルスタイルは [assets/styles/main.css](assets/styles/main.css)、コンポーネントのスタイルは `.vue` 内に書く
- **カスケードレイヤー**：`main.css` の既定スタイルは `@layer base`（要素や全体の規則）と `@layer components`（共通クラス）に入れる。コンポーネントの CSS はレイヤー外に置くので、詳細度や読み込み順に関係なく常にこれらに勝つ
  - トークン（`:root`）、利用者設定（`prefers-contrast` / `forced-colors` / `print`）の上書き、`.visually-hidden`、`::view-transition-*` はレイヤー外に置く。コンポーネントに負けてはいけないため
  - コンポーネントでは `@layer` を書かない。SSR のインライン `<style>` が `entry.css` より前に出るため、レイヤーの順序が崩れる
- 色は必ず `:root` のトークン経由で指定する。固定値では AI テーマに追従しない
- 色トークンは OKLCH のチャンネル断片（`--text: 0.29 0.014 70`）で持ち、`oklch(var(--text))` や `oklch(var(--text) / 72%)` の形で使う
  - `@property` に `<number>+` で登録しているので、トークンに `%` と `deg` は使えない。リテラルの `oklch()` も数値表記に揃える（stylelint で強制）
- 既定パレットの色相は、ニュートラル 70、アクセント 255、ハイライト 90 の 3 系統
- 11 トークンすべてを sRGB ガマット内に保つ。外れるとガマットマッピングで別の色になり、コントラストの実測が宣言値と食い違う
- `oklch()` の sRGB 変換は、OG 画像とアイコンの生成スクリプトでだけ `culori`（devDependency）を使って行う。satori も sharp も `oklch()` を解釈しないため
- ダークモードは `prefers-color-scheme` への追従のみ。トグルや永続化は持たない
  - ダークの `:root` は `@media (display-mode: standalone)` より前に置く。後ろに置くと AccentColor 追随が負ける
  - standalone のブロックはライトとダークの 2 系統ある。ダークの基準色は `color-mix()` の第 2 引数にリテラルで入っている
  - ダークでは `--accent-dark` が明るい方のアクセントになる（`--code-accent` が `--surface` に対し 4.5:1 を要するため、意図的）
  - [Profile.vue](components/Profile.vue) の `.top-card` はダークでも濃い地と明るい文字を保つ。地には `--surface-hover` を使う
  - ダークパレットは手で決める。`themeConstraints` の 14 件は手動で実測し、検証スクリプトはリポジトリに置かない
- 本文の文字色は `--text` / `--text-muted` / `--accent` / `--accent-dark` から選ぶ。これらは [libs/theme.ts](libs/theme.ts) の `themeConstraints` で、`--bg` と `--surface` に対し 4.5:1 が保証されている。`--text-faint` と `--highlight` は 3:1 なので装飾用にとどめる
- **`--bg` を変えたら次をすべて直す**：`:root`、ダークの `:root`、standalone の 2 系統、[manifest.webmanifest](public/manifest.webmanifest) の `theme_color` / `background_color`（ライトの値）、[nuxt.config.ts](nuxt.config.ts) の `theme-color` メタ 2 本（`media` 付き、デデュープ回避の `key` 付き）
- コードブロックは [libs/shiki-theme.ts](libs/shiki-theme.ts) の `--code-*` トークンで配色する。Shiki の組み込みテーマ（固定 hex）は使わない
- 16:9 サムネイルのカードは `.thumb-card` / `-image` / `-body` / `-title` / `-text` を使う。見出しには `.thumb-card-title` を直接付ける
- stylelint（[stylelint.config.mjs](stylelint.config.mjs)）で強制している規則
  - 長さは 0.25 の倍数の rem
  - `font-weight` は `400` と `800` のみ（Typekit の kit が 2 ウェイトしか持たない）
  - Baseline widely available の範囲で書く。そうでない機能は `@supports` で囲むか、`plugin/use-baseline` の ignore に追加する
  - プロパティの並び順は recess-order

## 主要機能

- **テーマ生成**：[ThemeChanger.vue](components/ThemeChanger.vue) が `api.newt239.dev/ai/generate-theme` に `colorFormat: "oklch"` を付けて送る。ガマットマッピングとコントラスト検証はサーバー側が担う
- **View Transitions**：`experimental.viewTransition` で有効化している。非対応ブラウザでは [page-transition.global.ts](middleware/page-transition.global.ts) が Vue の `pageTransition` を有効にし、[app.vue](app.vue) の `@supports not` でブラーを定義する
- **スクロール復元**：[router.options.ts](app/router.options.ts) は Nuxt 既定の実装から rAF を抜いたもの。スナップショット前にスクロールを確定させるためで、Nuxt に追従するときもこの差分は残す
- **作品画像のジェスチャ**：[ImageLightbox.vue](components/ImageLightbox.vue) はピンチ、ダブルタップ、ホイール、スワイプを Pointer Events で自前実装している
  - `.lightbox-content` の `touch-action: none` を緩めない。ブラウザのピンチと `transform` の二重管理になる
  - ハンドラは画像ではなく `.lightbox-content` に付ける。2 本目の指はレターボックスに降りるため
  - `setPointerCapture` は拡大中に画像上で押されたときだけ呼ぶ。等倍で呼ぶと、タップでライトボックスが閉じる。画像上のタップは `didDrag` を立てて背景クリック扱いから外す
  - ズームは焦点固定で `T += f * (1/S' - 1/S)`（`zoomAt`）を使う。ジェスチャ中は `.is-gesturing` で `transition` を切る
  - 単一ポインタの代替（± ボタン、パンボタン、前後ボタン）は消さない（SC 2.5.1 / 2.5.7）
  - 閉じるときに `pointers` をクリアする
- **一覧のフィルタとソート**：[useListControls.ts](composables/useListControls.ts) が URL クエリの同期と View Transition を担う。ページ固有の title / og:image は [usePageSeo.ts](composables/usePageSeo.ts) で設定する
- **アナリティクス**：[vue-gtag.client.ts](plugins/vue-gtag.client.ts)
  - gtag.js を読み込むのは `newt239.dev` の実ブラウザだけ。localhost、プレビュー、`navigator.webdriver`、ヘッドレス、ボットでは読み込まない
  - `?analytics=off` で `sessionStorage` にオプトアウトを記録し、`?analytics=on` で解除する。Claude in Chrome は自動検出できないので、この方法で除外する
- **Adobe Fonts**：[typekit.client.ts](plugins/typekit.client.ts) が kit を注入し、`onload` で `Typekit.load()` を呼ぶ。CSP のため、`app.head.script` へ戻さない

## SEO メタ

- サイト共通のデフォルトは `nuxt.config.ts` の `app.head` に静的に置く。ページ固有の値は各ページの `useSeoMeta` で設定する（ミドルウェアではプリレンダに載らない）
- canonical と og:url は [app.vue](app.vue) で `useRoute()` から組み立てる
- `description` を設定するのは作品詳細だけ（frontmatter の値）

## PWA

- インストール可能にする最小構成で、Service Worker は持たない（オフラインで白紙になることは許容している）
- `display` は `standalone` から変えない。変えると AccentColor 追随の `@media (display-mode: standalone)` が効かなくなる
- アイコンは `public/icon.png` を元に `public/icons/` へ生成する
  - `any`（192 / 512）と favicon は透過のまま出す。`maskable` と apple-touch-icon は `--bg` の既定色で不透明にする
  - `maskable` はセーフゾーンに収めるため 72% に縮小する。元画像を差し替えたら縮小率を見直す
- `public/screenshots/` は手動で撮影する。手順は `pwa-screenshots` スキルにある
- Lighthouse 12 には PWA の audit が無い。manifest は DevTools の Application > Manifest で確認する

## セキュリティヘッダ

[public/_headers](public/_headers) の `/*` で CSP などを返す（Observatory A+、issue #149）。

- `{{inline-script-hashes}}` は、Nitro の `close` フックで [write-csp-script-hashes.ts](scripts/write-csp-script-hashes.ts) が `.output/public/_headers` に書き込む。対象は importmap、`__NUXT_SITE_CONFIG__`、`__NUXT__.config` の 3 つ。`prerender:done` の時点では `_headers` がまだ無い。`generate` の後続コマンドにしないのは、Workers Builds のコマンドに依存させないため
- `style-src 'unsafe-inline'` は残す（Observatory で満点扱い）
- Adobe Fonts には `connect-src` と `font-src data:` の両方が要る。フォントは XHR で取得され、`data:` URI として注入されるため。CSS は読まないので `style-src` は不要
- 外部オリジンと、それを使う箇所
  - `use.typekit.net` / `p.typekit.net`：Adobe Fonts
  - `www.googletagmanager.com` / `*.google-analytics.com` / `*.analytics.google.com`：GA
  - `api.newt239.dev`：ThemeChanger と MyTopTrackList
  - `fernweh.newt239.dev`：LatestAlbumList
  - `img.newt239.dev`：fernweh のサムネイル
  - `i.scdn.co`：Spotify のジャケット画像
- フォントが適用されるかはローカルで判定しない（Chrome の HTTP キャッシュがポートをまたいで共有される）。プレビューデプロイで `html` の `wf-active` / `wf-inactive` を見て判定する
- SRI は付けない。Typekit と gtag.js は配信側で内容が更新されるため
- 検証は `pnpm run generate` のあと `pnpm exec wrangler dev` で行う（`serve:static` は `_headers` を解釈しない）

## エージェント向けディスカバラビリティ

- レスポンスヘッダは `_headers` でしか付けられない。同名ヘッダの複数行は Cloudflare がカンマで結合する
- `Link` で `sitemap` / `api-catalog` / `service-desc` / `service-doc` / `describedby` を返す
- [api-catalog](public/.well-known/api-catalog) は RFC 9727 と RFC 9264 に従う。リレーション名をオブジェクトのキーにする（`links` 配列ではない）。`Content-Type` は `_headers` で指定する
- [server-card.json](public/.well-known/mcp/server-card.json) は、api.newt239.dev の MCP サーバーの `initialize` 応答に合わせる（SEP-1649 が確定したら追従する）
- OAuth/OIDC のディスカバリ、`oauth-protected-resource`、`auth.md` は置かない。保護リソースが存在しないため
- Markdown for Agents は Free プランでは使えない
- [robots.txt](public/robots.txt) の `Content-Signal: ai-train=no` と学習クローラの Disallow は維持する

## アクセシビリティ検査

- 開発時は @nuxt/a11y の DevTools タブで見る（dev 限定で、`generate` の出力には入らない）
- CI の検査は Lighthouse CI の `categories:accessibility`（`minScore: 1`）だけ。`@axe-core/cli` は Lighthouse と重複するため廃止した。戻さない
- @nuxt/a11y のビルド時レポートは npm で公開されたら `a11y.report` で有効にする（issue #156）

## CI

- [lint.yml](.github/workflows/lint.yml)：PR で build、typecheck、ESLint、Stylelint、textlint を実行する
- [quality.yml](.github/workflows/quality.yml)：`generate` のあと Lighthouse CI を実行する（しきい値は [lighthouserc.json](lighthouserc.json)）
  - `meta-description`（description を持たない方針のため）と `robots-txt`（Content-Signal が不明なディレクティブ扱いになるため）は off にしている
  - ライトの既定テーマだけを検査する。ダークは検査されない
- [cloudflare-workers.yml](.github/workflows/cloudflare-workers.yml)：週次 cron（月曜 0 時）と手動実行でデプロイする。Spotify の My Top Tracks を更新するため

## デプロイ

- Workers Static Assets で配信する。Worker スクリプトは持たず、[wrangler.jsonc](wrangler.jsonc) の `assets` だけで設定する
  - `assets.directory` は `.output/public` を指す（`dist` は絶対パスのシンボリックリンク）
  - `html_handling` と `not_found_handling` は明示する。`autoSubfolderIndex: false` と `auto-trailing-slash` で Pages と同じ URL 解決になる
  - 末尾スラッシュのリダイレクトは 307 になる（Pages は 308）。回避手段はない
- `newt239.dev/*` は Workers Route で配信する。route を外せば Pages の配信に戻る。カスタムドメインへ切り替えるとダウンタイムが出る
- Pages は Git 連携と自動ビルドを停止済みで、ロールバック先として残してある
- `public/_headers` は Workers Static Assets でも解釈される。ファイル自体は配信されない
- デプロイ経路
  - Workers Builds：push ごとにビルドし、main は本番、それ以外のブランチはプレビューへ出す
  - GitHub Actions：週次 cron で実行する
- Workers Builds のシステム Node は pnpm を起動するだけ（スクリプトは `devEngines.runtime` の Node で動く）
- `nitro.compressPublicAssets` は使わない（Workers が自前で圧縮する）
