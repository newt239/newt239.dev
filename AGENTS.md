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

`dev` / `build` / `typecheck` / `generate` / `preview` / `lint` / `lint:fix` / `lint:css` / `lint:css:fix` は `package.json` の `scripts` のとおり。実行タイミングに条件があるものだけ以下に挙げる。

```bash
# content 配下の Markdown の文章チェック
pnpm run lint:text

# public/images の画像を WebP へ圧縮
pnpm run compress

# OG 画像の生成（作品の追加・タイトル・期間・画像を変更したら実行する）
pnpm run og

# llms.txt の生成（作品または libs/articles.ts を変更したら実行する）
pnpm run llms

# PWA アイコンの生成（public/icon.png を差し替えたら実行する）
pnpm run icons

# .output/public を localhost:3100 で配信（PWA スクリーンショットの撮り直し用）
pnpm run serve:static
```

パッケージマネージャは **pnpm**、ランタイムは **Node.js** です。`npm` / `yarn` / `bun` は使いません。

バージョンは `package.json` の `packageManager` と `devEngines.runtime` **だけ**で固定します。`.node-version` や `mise.toml` のような外部のバージョン管理ファイルは置きません。`pnpm install` が `devEngines.runtime` の Node を取得し、`pnpm run` はそれをスクリプトへ供給するため、実行環境のシステム Node が何であっても揃います。

pnpm の設定は [pnpm-workspace.yaml](pnpm-workspace.yaml) に置きます。`.npmrc` は使いません。

- `saveExact` でバージョンを完全固定する
- `minimumReleaseAge` が 10080 分（7 日）なので、リリース直後のバージョンはインストールされない
- postinstall を走らせる依存は `allowBuilds` に明示する。追加を怠ると `ERR_PNPM_IGNORED_BUILDS` で install が失敗する

`scripts/` の TypeScript は Node のネイティブ実行（型の除去）で動かします。**相対 import には `.ts` 拡張子が必須**です。省略すると `ERR_MODULE_NOT_FOUND` になります。

## アーキテクチャ

### コンテンツ管理

- **Nuxt Content v3** を使用してポートフォリオ作品を管理
- 作品は `content/works/` 内に frontmatter メタデータ付きの Markdown ファイルとして保存
- [content.config.ts](content.config.ts) でコンテンツスキーマが定義されており、以下のフィールドが必須:
 - `images`（1件以上の `src`/`alt` の配列。先頭がサムネイル・OG 画像に使われる）, `tech`, `period`。任意で `order`, `github`, `description`
- OG 画像は [scripts/generate-og-images.ts](scripts/generate-og-images.ts) が `public/og/` へ生成する。CI ではなくローカルで `pnpm run og` を実行し、生成物ごとコミットして push する
- 生成にはローカルの `~/Library/Fonts/FOT-UDKakugo_LargePr6N-{R,B}.otf` を使う。Adobe Fonts で同期していない環境ではスクリプトが失敗する
- `public/llms.txt` は [scripts/generate-llms-txt.ts](scripts/generate-llms-txt.ts) が `content/works/` と [libs/articles.ts](libs/articles.ts) から生成する。OG 画像と同じくローカルで `pnpm run llms` を実行し、生成物ごとコミットする。作品を足したら `pnpm run og` と併せて両方実行する
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

### スタイリング

- [assets/styles/main.css](assets/styles/main.css) に CSS カスタムプロパティを使用したグローバルスタイルを配置
- `.vue` ファイル内にコンポーネントスコープのスタイル
- テーマ用の CSS 変数（`ThemeChanger` コンポーネント経由で動的に変更可能）
- アクセシビリティ重視: focus-visible 状態、prefers-reduced-motion 対応
- 色は必ず `:root` のトークン経由で指定する。固定値を書くと AI テーマ生成に追従しない
- 色トークンは **OKLCH のチャンネル断片**（`--text: 0.29 0.014 70` = `L C H`）で持ち、利用側は `oklch(var(--text))` / `oklch(var(--text) / 72%)` と書く。完全な色値にすると `/ N%` のアルファ指定と `@property` の補間が壊れる
- `@property` に `syntax: "<number>+"` で登録する都合上、トークンは **`%` と `deg` を使えない**。リテラルの `oklch()` も数値表記で揃える（[stylelint.config.mjs](stylelint.config.mjs) の `lightness-notation` / `hue-degree-notation` で強制）
- 既定パレットは色相を 3 系統に統一している。ニュートラル 70 / アクセント 255 / ハイライト 90
- **11 トークンすべてを sRGB ガマット内に保つ。** 外れるとブラウザが CSS Color 4 のガマットマッピングで別の色へ写すため、宣言値とコントラストの実測が食い違う
- `oklch()` を sRGB へ落とす必要があるのは [scripts/generate-og-images.ts](scripts/generate-og-images.ts) と [scripts/generate-app-icons.ts](scripts/generate-app-icons.ts) だけ。satori（→ SVG → librsvg）も sharp も `oklch()` を解釈しないため `culori` で変換する。`culori` はビルド時のみの devDependency で、クライアントバンドルには入れない
- **ダークモードは `@media (prefers-color-scheme: dark)` による OS 追従のみ。** 明示トグルも永続化も持たない。ダークの `:root` は **`@media (display-mode: standalone)` より前**に置く。後ろに置くと PR #85 の AccentColor 追随が丸ごと負ける
- standalone のブロックはライトとダークの 2 系統を持つ。ダークの基準色は `color-mix()` の第 2 引数にリテラルで入っているので、ダークの `--bg` などを変えたら `:root` と両方直す
- ダークでは `--accent-dark` が「明るい方のアクセント」になり名前の意味が反転する。`--code-accent` がここから派生し `--surface` に対し 4.5:1 を要求するため意図的にそうしている
- [Profile.vue](components/Profile.vue) の `.top-card` はダークでもライトと同じ配色（濃い地・明るい文字）を保つ。トークンをそのまま入れ替えると明るいカードへ反転するため、地は `--surface-hover`（ライトの `--text` とほぼ同じ色）を使う
- ダークパレットは AI に生成させず手で決め、`themeConstraints` の 14 件を手動で実測して確認する。リポジトリに検証スクリプトは置かない
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

- **テーマ生成**: [ThemeChanger.vue](components/ThemeChanger.vue) は AI を使用してユーザーのプロンプトから CSS カスタムプロパティを生成（`api.newt239.dev/ai/generate-theme` 経由）。リクエストの `colorFormat` で値の形式を明示する（`oklch` を送る）。ガマットマッピングとコントラスト検証はサーバー側が担う
- **View Transitions**: [nuxt.config.ts](nuxt.config.ts) の `experimental.viewTransition` で有効化
- **ページトランジション**: View Transition 非対応ブラウザ向けのフォールバック。[middleware/page-transition.global.ts](middleware/page-transition.global.ts) が `document.startViewTransition` の無いときだけ Vue の `pageTransition` を有効化し、[app.vue](app.vue) の `@supports not (view-transition-name: none)` 内でブラー + 不透明度を定義する
- **スクロール復元**: [app/router.options.ts](app/router.options.ts) は Nuxt 既定の `scrollBehavior` とほぼ同じだが、View Transition のスナップショット取得より前にスクロール位置を確定させるため rAF を挟まない（PR #119）。Nuxt 側の改善に追従する際はこの差分だけを維持する
- **作品画像のジェスチャ**: [ImageLightbox.vue](components/ImageLightbox.vue) はピンチ・ダブルタップ・ホイール・スワイプを Pointer Events で自前実装する。`.lightbox-content` の `touch-action: none` を緩めてブラウザのピンチに任せてはいけない。`transform` の `scale` / `translate` と二重管理になり、`clampTranslate` とズーム率表示が実状とずれる
  - ポインタハンドラは画像ではなく `.lightbox-content` に付ける。ピンチの 2 本目の指はレターボックス部分に降りるため、画像に付けたままではジェスチャが開始しない
  - `setPointerCapture` は拡大中に画像上で押されたときだけ呼ぶ。キャプチャ中は互換 `click` もキャプチャ要素へリターゲットされるため、等倍で呼ぶと画像をタップしただけでライトボックスが閉じる。同じ理由で画像上のタップは `didDrag` を立てて背景クリック判定から外す
  - ズームは焦点固定。`scale(S) translate(T)` は中心基準なので、焦点 `f` を保つには `T += f * (1/S' - 1/S)` を使う（`zoomAt`）。ピンチとホイールの最中は `.is-gesturing` で `transition` を切る。補間の途中値では焦点が保たれず、カーソル下の点が滑る
  - ジェスチャを足しても SC 2.5.1 / 2.5.7 の単一ポインタ代替（± ボタン・パンボタン・前後ボタン）は消さない
  - 閉じるときに `pointers` をクリアする。指を置いたまま閉じると `pointerup` が届かず、次に開いたとき 1 本指でピンチ判定になる
- **一覧のフィルタとソート**: [composables/useListControls.ts](composables/useListControls.ts) が URL クエリと下書き状態の同期、適用時の View Transition を担う。[usePageSeo.ts](composables/usePageSeo.ts) はページ固有の title / og:image を設定する
- **アナリティクス**: [plugins/vue-gtag.client.ts](plugins/vue-gtag.client.ts) で vue-gtag-next を使用した Google Analytics
  - 計測するのは `newt239.dev` を開いた実ブラウザだけ。localhost とプレビューデプロイ、`navigator.webdriver` が立つ自動化ブラウザ、ヘッドレスやボットの UA では gtag.js を読み込まない
  - `?analytics=off` を付けてアクセスすると `sessionStorage` にオプトアウトを記録する。同じタブ内ならフルページ遷移を跨いでも維持され、別タブとタブを閉じたあとには影響しない。`?analytics=on` で解除する
  - Claude in Chrome は `navigator.webdriver` が false で UA も通常の Chrome と同一のため、ページ側から自動検出できない。上のオプトアウトで除外する
- **Adobe Fonts**: [plugins/typekit.client.ts](plugins/typekit.client.ts) が `useHead` で Typekit の kit を注入し、`onload` で `Typekit.load()` を呼ぶ。CSP の `script-src` からインラインイベントハンドラを排除するためにプラグインへ寄せてあり、`nuxt.config.ts` の `app.head.script` へ戻してはいけない

### SEO メタ

- サイト共通のデフォルト（title、og:title、og:image、twitter:*）は [nuxt.config.ts](nuxt.config.ts) の `app.head` に静的に置く
- ページ固有の値は各ページの `useSeoMeta` で設定する。ミドルウェアからは設定しない（クライアントでしか動かずプリレンダ HTML に載らない）
- canonical と og:url はパスに依存するため [app.vue](app.vue) で `useRoute()` から組み立てる
- `description` はサイト共通・ページ共通ともに設定していない。作品詳細のみ `content/works/*.md` の frontmatter の値が入る

### PWA

- インストール可能にする最小限の構成のみを持ち、**Service Worker は持たない**。週次 cron と push ごとの Workers Builds で更新が走るサイトに対し、キャッシュ世代管理の複雑さが見合わないため。オフライン時に白紙になることは受け入れている。Chrome はインストール要件から fetch ハンドラを外しているので、Service Worker が無くてもインストールはできる
- **`display` を `standalone` から変えてはいけない。** `minimal-ui` などにすると [main.css](assets/styles/main.css) の `@media (display-mode: standalone)` がマッチせず、PR #85 の AccentColor 追随が丸ごと効かなくなる
- アイコンは [scripts/generate-app-icons.ts](scripts/generate-app-icons.ts) が `public/icon.png` を元に `public/icons/` へ生成する。OG 画像と同じくローカルで `pnpm run icons` を実行し、生成物ごとコミットする
  - `purpose: "any"`（192 / 512）と favicon は透過のまま出す。`maskable` と apple-touch-icon だけ `--bg` の既定色で不透明化する。iOS は透過を黒で合成し、maskable はマスクが全面を塗る前提のため
  - `maskable` はセーフゾーン（中心の直径 80% の円）に収めるため 72% に縮小して中央へ合成する。`public/icon.png` は被写体が端まで広がっており（余白は上 6% / 下 0%）、原寸のままでは円マスクで欠ける。アイコンを差し替えたら縮小率を見直す
- `theme_color` と `background_color` は**ライトの** `--bg` の既定値 `#fff8f1` のリテラル。[manifest.webmanifest](public/manifest.webmanifest) は静的 JSON なので `prefers-color-scheme` で分岐できず、ダーク用の値は持てない。[nuxt.config.ts](nuxt.config.ts) の `theme-color` メタは `media` 付きでライトとダークの 2 本を出す（unhead のデデュープを避けるため `key` を付ける）。`main.css` の `:root`・ダークの `:root`・standalone の 2 系統と合わせて連動するので、`--bg` を変えたらすべて直す
  - インストール済み PWA では `--bg` が AccentColor と `color-mix` されるため、実際の背景は `theme_color` と厳密には一致しない。manifest は静的値しか持てないので素の既定値に合わせている
- `public/screenshots/` は手動撮影で、生成スクリプトは持たない。撮り直しの手順と Chrome のリッチインストール UI の制約は `pwa-screenshots` スキルにある
- Lighthouse 12 で PWA カテゴリごと `installable-manifest` / `maskable-icon` の audit が削除されたため、[lighthouserc.json](lighthouserc.json) に manifest 関連の assertion は置けない。確認は Chrome DevTools の Application > Manifest で行う

### セキュリティヘッダ

[public/_headers](public/_headers) の `/*` で CSP と各種セキュリティヘッダを返す。MDN HTTP Observatory で A+ を取るための構成（issue #149）。

- `script-src` の `{{inline-script-hashes}}` はビルド時に置換されるプレースホルダ。[scripts/write-csp-script-hashes.ts](scripts/write-csp-script-hashes.ts) がプリレンダ済み HTML のインラインスクリプトから sha256 を集め、`.output/public/_headers` へ書き込む。対象は `<script type="importmap">` と `window.__NUXT_SITE_CONFIG__` / `window.__NUXT__.config` の 3 つで、`application/json`（`__NUXT_DATA__`）と `application/ld+json` は CSP の対象外なので除外する
- 呼び出しは [nuxt.config.ts](nuxt.config.ts) の Nitro `close` フック。`public/` の資産が `.output/public` へコピーされるのは prerender より後なので、`prerender:done` では `_headers` がまだ存在せず失敗する。`pnpm run generate` に後続コマンドを足す形にしないのは、Workers Builds が実行するコマンドに依存させないため
- `style-src` の `'unsafe-inline'` は残す。Observatory は `csp-implemented-with-unsafe-inline-in-style-src-only` を満点として扱う
- **Adobe Fonts は `connect-src` と `font-src data:` の両方が要る。** kit の動的サブセットはフォントを `<link>` や `url()` ではなく XHR で取得し、`data:` URI として `@font-face` に注入する。`font-src https://use.typekit.net` だけ許可してもフォントは適用されず、Web Font Loader が `html` に `wf-inactive` を付けて終わる（PR #159 で 1 度踏んだ）。`p.typekit.net` へのビーコンも XHR なので `connect-src` に要る。CSS は 1 枚も読まないので `style-src` に typekit のオリジンは不要
- 外部オリジンの許可根拠: `use.typekit.net` / `p.typekit.net` は Adobe Fonts、`www.googletagmanager.com` と `*.google-analytics.com` / `*.analytics.google.com` は GA、`api.newt239.dev` は [ThemeChanger.vue](components/ThemeChanger.vue) と [MyTopTrackList.vue](components/MyTopTrackList.vue)、`fernweh.newt239.dev` は [LatestAlbumList.vue](components/LatestAlbumList.vue)、`img.newt239.dev` は fernweh が返すサムネイル、`i.scdn.co` は Spotify のジャケット画像
- ローカルでフォントの可否を判定してはいけない。Chrome の HTTP キャッシュは localhost のポートをまたいで共有されるため、CSP 無しで開いた結果が CSP 有りの検証に混ざる。判定は `html` 要素の `wf-active` / `wf-inactive` で行い、プレビューデプロイで確認する
- subresource-integrity は対応しない。Typekit の kit JS と gtag.js は配信側が内容を更新するため `integrity` を固定するとサイトが壊れる
- 検証は `pnpm run generate` してから `pnpm exec wrangler dev` で行う。`pnpm run serve:static` の `serve` は `_headers` を解釈しない

### エージェント向けディスカバラビリティ

Worker スクリプトを持たないため、レスポンスヘッダを付ける手段は [public/_headers](public/_headers) だけ。同じヘッダ名を複数行書くと Cloudflare がカンマで結合するので、`Link` は 1 行ずつ並べてよい。

- [public/_headers](public/_headers) の `Link` は RFC 8288。`sitemap` / `api-catalog` / `service-desc` / `service-doc` / `describedby` を返す
- [public/.well-known/api-catalog](public/.well-known/api-catalog) は RFC 9727 の API カタログ。中身は RFC 9264 の linkset+json で、**リレーション名をオブジェクトのキーにする**（`links` 配列を使う形は RFC 9264 ではない）。拡張子が無く MIME を推定できないので `_headers` で `Content-Type` を指定している
- [public/.well-known/mcp/server-card.json](public/.well-known/mcp/server-card.json) は api.newt239.dev で動いている MCP サーバーを指す。値は実サーバーの `initialize` 応答に合わせる。SEP-1649 はまだ PR 段階なので、確定したらスキーマに追従する
- OAuth/OIDC のディスカバリ、`oauth-protected-resource`、`auth.md` は置かない。newt239.dev に保護リソースも認可サーバーも無く、存在しないエンドポイントを広告することになるため
- Markdown for Agents（`Accept: text/markdown` でのネゴシエーション）は Cloudflare の Pro 以上のゾーン設定で、Free プランでは有効化できない
- [public/robots.txt](public/robots.txt) の `Content-Signal: ai-train=no` と学習クローラの Disallow は維持する。利用者の代理で動くエージェントのフェッチは `User-agent: *` の Allow に含まれる

### アクセシビリティ検査

- 開発時は [@nuxt/a11y](https://github.com/nuxt/a11y) の DevTools タブで見る。ページ遷移ごとに axe-core が走り違反が一覧される。モジュールの `enabled` は既定で `dev` のみで、production の `setup` は即 return するため `nuxt generate` の出力に axe-core は入らない
- CI で検査するのは Lighthouse CI の `categories:accessibility` だけ。`minScore: 1` を維持する
- `@nuxt/a11y` のビルド時レポート（Nitro の `prerender:generate` でプリレンダ済み全ルートを検査し `failOnViolation` で落とす）は upstream の main にあるが **npm 未公開**。公開されている `1.0.0-alpha.1` には含まれない。公開されたら `a11y.report` を有効にして `pnpm run generate` に同居させる（issue #156）
- `@axe-core/cli` は廃止した。70 ルールのうち 50 は Lighthouse も実行しており、`color-contrast` と `target-size` も Lighthouse が実ブラウザで見る。検査対象 URL を `package.json` に手書きする保守コストの方が重い

### CI

- [lint.yml](.github/workflows/lint.yml) - PR で `pnpm run build` / `typecheck` / ESLint / Stylelint / textlint
- [quality.yml](.github/workflows/quality.yml) - PR と手動実行で `pnpm run generate` してから Lighthouse CI
  - しきい値は [lighthouserc.json](lighthouserc.json)。`meta-description` と `robots-txt` は off にしている（description を持たない方針と、`robots.txt` の Content-Signal 行を Lighthouse が不明なディレクティブとみなすため）
  - Lighthouse が見るのは**ライトのデフォルトテーマだけ**。ヘッドレス Chrome の既定が `prefers-color-scheme: light` のためダーク配色は検査されない。AI 生成テーマのコントラストは `themeConstraints` を通じてサーバー側（api.newt239.dev）が検証する
- [cloudflare-workers.yml](.github/workflows/cloudflare-workers.yml) - 週次 cron と手動実行でデプロイ

### デプロイ

- Cloudflare Workers の静的アセット（Workers Static Assets）に SSG の出力を載せている。Worker スクリプトは持たず、[wrangler.jsonc](wrangler.jsonc) の `assets` だけで配信する
- `assets.directory` は `dist` ではなく `.output/public` を指す。`dist` は `nuxt generate` が張る絶対パスのシンボリックリンクで、CI 環境で辿れる保証がない
- `assets.html_handling` と `assets.not_found_handling` は明示する。Pages は `404.html` を暗黙に使うが Workers は設定しないと汎用の 404 を返す。`nitro.prerender.autoSubfolderIndex: false` により `about.html` 形式で出力されるため、`auto-trailing-slash` が Pages と同じ URL 解決になる
- `/about/` のような末尾スラッシュ付きの URL は `/about` へリダイレクトされるが、Pages の 308 に対し Workers は 307 を返す。仕様差であり回避手段はない
- `newt239.dev` は Workers Route（`newt239.dev/*`）で配信する。Workers Route は origin より前に実行されるため、Pages 側のカスタムドメインを残したまま無停止で切り替えられ、route を外せば Pages の配信に戻る。カスタムドメインとして登録し直すと Pages 側から先に外す必要があり、その間ダウンタイムが出る
- デプロイ経路は 2 系統
  - Cloudflare 側の Git 連携（Workers Builds）が push ごとにビルドする。main は本番へデプロイし、それ以外のブランチはプレビュー版としてアップロードする
  - [.github/workflows/cloudflare-workers.yml](.github/workflows/cloudflare-workers.yml) が週次 cron（毎週月曜 0 時）と手動実行で `pnpm run generate` してから `wrangler deploy` する。Spotify の My Top Tracks を更新するためにこの週次ビルドがある
- Workers Builds のビルドイメージは既定が Node 24 系だが、`pnpm run` が `devEngines.runtime` の Node でスクリプトを走らせるため合わせる必要はない。システム Node は pnpm を起動するだけ
- Pages 側の Git 連携と自動ビルドは停止済み。Pages プロジェクトはロールバック先として残してある
- `nitro.compressPublicAssets` は使わない。Workers Static Assets は事前圧縮ファイルを利用せず自前で圧縮するため、`.br` / `.gz` はアップロード対象が増えるだけの無駄になる
- `public/_headers` は Workers Static Assets でもそのまま解釈される。ファイル自体は配信されない
