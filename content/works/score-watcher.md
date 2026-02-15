---
title: Score Watcher
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
    alt: Webアプリ「Score Watcher」のスクリーンショット。画面上部に形式名「5by5」、第20問、問題文と解答が表示されている。
---

クイズ大会におけるプレイヤーのリアルタイムでの得点情報を可視化するための Web アプリケーションです。N○M✕, N updown といった基本的な形式だけでなくアタックサバイバルや Square X といった形式にも対応しています。ダークモードや問題文の表示機能、undo 機能等も備えています。すべての処理を端末上で行っているため、オフライン環境でも動作します。

栄東例会 2023 に合わせて開発し、一般公開したのちも大規模なアップデートを重ねており、現在では週に 100 人程度のユーザーからアクセスがあります。

## 対応している形式

- スコア計算
- N○M✕
- 連答付き N○M✕
- NY
- N○M 休
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

- AQL ルール

## リンク

- <a href="https://score-watcher.com/" target="_blank">Score Watcher</a>
- <a href="https://zenn.dev/newt_st21/articles/score-watcher-quiz-scoreboard-app" target="_blank">競技クイズ用得点表示ソフト「Score Watcher」を開発しました</a>

## Score Watcher （旧バージョン）

- <a href="https://github.com/newt239/score-watcher" target="_blank">newt239/score-watcher - GitHub</a>

この Web アプリケーションの前身となったソフトです。Electron, Vue.js (v2)で開発していました。

最終バージョンは以下のリンクからインストールできます。

- <a href="https://github.com/newt239/score-watcher/releases" target="_blank">Releases ・ newtt239/score-watcher</a>
