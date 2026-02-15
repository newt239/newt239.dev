---
title: ポートフォリオサイト
github: newt239/newt239.dev
period: 2021 -
tech:
  - Nuxt
  - Cloudflare Pages
images:
  - src: portfolio.webp
    alt: "「ne​wt239.dev」のポートフォリオ Web サイトのトップページ画面。左上に幾何学模様で象られたマスコットロゴとサイト名、右上にテーマ生成のためのボタンがある。ヒーローセクションはブルーグレーのグラデーションカードで、見出し「Welcome✨」と箇条書き「19さい」「すきなもの: Webフロントエンド, UI/UX」「言語: TypeScript, Python, Go」「趣味: アニメ, ボカロ等」と記載されている。その右側にソーシャルリンクボタンが縦並びで「Twitter @newt239」「GitHub @newt239」「Zenn @newt_st21」「Qiita @newt239」とある。下部には見出し「Works」と 4 件のカードが並び、それぞれ「Gateway」「Score Watcher」「Look Inside View」「Roomkeeper」と記載されている。"
---

このサイトです。一番長いあいだ作り込んでいるものであるとも言えます。

## 2021 年

すでにアーカイブしていてリポジトリも非公開なのですが、HTML/CSS/JavaScript で開発し、Firebase Hosting で公開していました。

リポジトリを見ると、フラッシュ暗算ができるページがあったことが伺い知れます。[Quiz Flasher](./quiz-flasher)の開発とほぼ同時期で、GAS 上で公開していたページをポートフォリオサイトから操作できるよう、フロント部分をこのサイトに組み込んでいたようです。

CSS は SCSS で書いていて、Gulp でビルドしていました。

## 2022 年

この年、生の HTML から Vue.js に移行しました。ホスティング先も Firebase Hosting から Cloudflare Pages に移行し、デザインも一新しました。

## 2023 年

大きな変化としては Vue.js から Nuxt の SSG モードに移行したことです。

また、トップページ下部に Spotify の My Top Tracks を表示するようにしました。Hono で動かしている api.newt239.dev というサービスがあり、認証やデータの整形はそちらで行っていて、このウェブサイトでは SSG するときにそのデータを取得しています。

毎週月曜日に GitHub Actions でビルドを走らせていて、Spotify の情報はそのタイミングで更新されます。

## 2024 年

SecHack365 で取り組んでいる「LLM にデザインを生成させる」というアプローチの PoC として、ユーザーからのプロンプトに応じてサイトのテーマが変わる機能を実装しました。

サイト右上のキラキラボタンから利用できます。これも Spotify と同様に api.newt239.dev で OpenAI の API を叩いているのですが、破産を防ぐために簡易的な利用回数制限を設けています。

Cloudflare D1 で本機能が実行された回数をカウントしていて、24 時間あたりの利用回数が 100 回を超えると利用できないようになっています。
