---
title: Score Watcher
url: https://score-watcher.com/
order: 2
github: newt239/next-score-watcher
period: 2022.10 - 2023.05
tech:
  - Next.js
  - Chakra UI
  - Dexie.js
description: クイズ大会におけるプレイヤーの得点状況を可視化するソフトです。
images:
  - src: next-score-watcher.webp
    alt: 得点表示の画面。上部に形式名「5by5」、第20問の問題文と解答が表示されている。
---

クイズ大会におけるプレイヤーのリアルタイムでの得点情報を可視化するためのWebアプリケーションです。N○M✕, N updownといった基本的な形式だけでなくアタックサバイバルやSquare Xといった形式にも対応しています。ダークモードや問題文の表示機能、undo機能等も備えています。すべての処理を端末上で行っているため、オフライン環境でも動作します。

栄東例会2023に合わせて開発し、一般公開したのちも大規模なアップデートを重ねており、現在では週に100人程度のユーザーからアクセスがあります。

## 対応している形式

- スコア計算
- N○M✕
- 連答付きN○M✕
- NY
- N○M休
- NbyN
- Nupdown
- Divide
- Swedish10
- Backstream
- アタックサバイバル
- Square X
- Z
- Freeze X
- エンドレスチャンス
- Variables

- AQLルール

## リンク

::link-card{url="https://score-watcher.com/"}
::

::link-card{url="https://zenn.dev/newt_st21/articles/score-watcher-quiz-scoreboard-app"}
::

## Score Watcher （旧バージョン）

::link-card{url="https://github.com/newt239/score-watcher"}
::

このWebアプリケーションの前身となったソフトです。Electron, Vue.js (v2)で開発していました。

最終バージョンは以下のリンクからインストールできます。

::link-card{url="https://github.com/newt239/score-watcher/releases"}
::
