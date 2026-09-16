---
title: oxlint rules gacha
github: newt239/oxlint-rules-gacha
period: 2026.09
tech:
  - Next.js
  - React
  - StyleX
  - Motion
  - Zdog
description: oxlintの870個のリントルールを、ガチャを引く感覚で1つずつ読んでいく非公式ファンサイトです。
images:
  - src: oxlint-rules-gacha.webp
    alt: トップページ。濃紺の背景に「Draw one oxlint rule at a time.」の見出しが置かれ、中央のパネルには黄色と白のガチャカプセルが浮かぶ。その下に「Draw a rule」ボタンと、排出対象を絞り込む「Filters」が並ぶ。
  - src: oxlint-rules-gacha-collection.webp
    alt: コレクション画面。「29 of 870 rules collected」の進捗バーの下に、eslintやtypescriptなどプラグイン別の入手数と、correctnessやstyleなどカテゴリ別の入手数が並ぶ。さらに下には最近入手したルール名が一覧で続く。
  - src: oxlint-rules-gacha-og.webp
    alt: 共有時に表示されるOG画像。カテゴリの色を並べた帯の下に「oxlint rules gacha」のタイトルと「Draw one of the 870 oxlint rules, one capsule at a time.」の説明が置かれ、右下にドメイン名が入る。
---

oxlintに搭載された870個のリントルールを、ガチャを引く感覚で1つずつ読んでいくための非公式ファンサイトです。引いたルールはそのままURLになるので、気に入ったルールをリンクとして共有できます。

引いたルールはコレクションに貯まっていき、まとめて`.oxlintrc.json`のスニペットとして書き出せます。ルールの説明とコード例は、oxcプロジェクトのドキュメントの原文をそのまま表示しています。

## 技術的な特徴

- ルールのデータはoxc.rsのドキュメントから取得し、週に1度取り直しています。ビルド時に生成するので、アプリ側は出来上がったJSONを読むだけです。
- ランダムに1件のルールを返す読み取り専用のAPIを`/api/random`で公開しています。
- ガチャのカプセルはZdogで描画しました。排出時の演出はMotionで組み立てています。
- スタイリングにはStyleXを採用し、ビルド時に静的なCSSへ変換しています。
- ホスティングにはGMOのデプロイナウを使っています。

## 関連リンク

- 公開サイト
  - [oxlint rules gacha](https://oxlint-gacha.newt239.dev/)
- GitHubリポジトリ
  - [newt239/oxlint-rules-gacha](https://github.com/newt239/oxlint-rules-gacha)
