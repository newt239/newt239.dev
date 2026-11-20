---
title: Score Watcher
url: https://score-watcher.com/
order: 2
github: newt239/next-score-watcher
period: 2022.10 - 2026.11
tech:
  - Next.js
  - Mantine
  - Dexie.js
description: クイズ大会におけるプレイヤーの得点状況を可視化するソフトです。
images:
  - src: score-watcher.webp
    alt: ダークモードの得点表示画面。上部に「準決勝 7○3✕」と問題文、解答が出ている。6人の名前が縦書きで並び、1人目は勝ち抜けの「1st」、4人目は失格の「LOSE」、ほかは正答数と誤答数を表示している。
  - src: score-watcher-winthrough.webp
    alt: 5by5の得点表示画面。プレイヤーが勝ち抜けた瞬間で、画面中央のグラデーションのポップアップに王冠と「1st」、プレイヤー名、「Xでシェア」ボタンが出ている。
  - src: score-watcher-editable.webp
    alt: NewYork形式の得点表示画面。「スコアの手動更新」にチェックが入り、7人それぞれの名前の上に編集アイコンが付いて、ポイントと正答数を直接書き換えられる状態になっている。
  - src: score-watcher-attack25.webp
    alt: アタック25の得点表示画面。左に赤・緑・白・青の4人と獲得枚数、右に5×5のパネルが並ぶ。青のプレイヤーが選択中で、獲得できるパネルが黄色の枠で示されている。
  - src: score-watcher-aql.webp
    alt: AQLルールの得点表示画面。左右に5人ずつのチームが並び、各チームの名前と、メンバーのポイントを掛け合わせたスコア「96」「54」が大きく表示されている。
---

クイズ大会におけるプレイヤーのリアルタイムでの得点情報を可視化するためのWebアプリケーションです。N○M✕, Nupdownといった基本的な形式だけでなくアタックサバイバルやSquareXといった形式にも対応しています。ダークモードや問題文の表示機能、undo機能等も備えています。すべての処理を端末上で行っているため、オフライン環境でも動作します。

栄東例会2023に合わせて開発し、一般公開したのちも大規模なアップデートを重ねており、現在では週に100人程度のユーザーからアクセスがあります。

## 対応している形式

- スコア計算
- N○M✕
- 連答つきN○M✕
- NewYork
- N○M休
- NbyN
- Nupdown
- Divide
- Swedish10
- Backstream
- アタックサバイバル
- SquareX
- Z
- freezeX
- エンドレスチャンス
- Variables
- AQL
- アタック25

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
