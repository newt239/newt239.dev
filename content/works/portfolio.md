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

すでにアーカイブしていてリポジトリも非公開なのですが、HTML/CSS/JavaScriptで開発し、Firebase Hostingで公開していました。

リポジトリを見ると、フラッシュ暗算を行うページを用意していたことが伺い知れます。[Quiz Flasher](./quiz-flasher)の開発とほぼ同時期で、GAS上で公開していたページをポートフォリオサイトから操作できるよう、フロント部分をこのサイトに組み込んでいたようです。

CSSはSCSSで書いていて、Gulpでビルドしていました。

## 2022 年

この年、生のHTMLからVue.jsに移行しました。ホスティング先もFirebase HostingからCloudflare Pagesに移行し、デザインも一新しました。

## 2023 年

大きな変化としてはVue.jsからNuxtのSSGモードに移行したことです。

また、トップページ下部にSpotifyのMy Top Tracksを表示するようにしました。Honoで動かしているapi.newt239.devというサービスがあり、認証やデータの整形はそちらで行っていて、このウェブサイトではSSGするときにそのデータを取得しています。

毎週月曜日にGitHub Actionsでビルドを走らせていて、Spotifyの情報はそのタイミングで更新されます。

## 2024 年

SecHack365で取り組んでいる「LLMにデザインを生成させる」というアプローチのPoCとして、ユーザーからのプロンプトに応じてサイトのテーマが変わる機能を実装しました。

サイト右上のキラキラボタンから利用できます。これもSpotifyと同様にapi.newt239.devでOpenAIのAPIを叩いているのですが、破産を防ぐために簡易的な利用回数制限を設けています。

Cloudflare D1で本機能が実行された回数をカウントしていて、24時間あたりの利用回数が100回を超えると利用できないようになっています。
