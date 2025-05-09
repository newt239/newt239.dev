---
title: Local Font Emulator
thumbnail: local-font-emulator.webp
alt: 黄色の角丸ブロックをレンガ状に配置し、太字黒文字で 「Local Font Emulator」と記載。右中段のブロックに「newt239 / local-font-emulator」のリポジトリ名が小さく入ったビジュアルバナー。
github: newt239/local-font-emulator
period: 2023.04 - 2023.05
tech:
  - React
  - Mantine
---

ローカルフォントの一覧を取得し、それらをブラウザ上で表示することができる Web アプリです。

※ ブラウザの <a href="https://developer.mozilla.org/en-US/docs/Web/API/Local_Font_Access_API" target="_blank">`Local Font Access API`</a> を利用しているため、デスクトップ版の Google Chrome でのみ利用できます。

## リンク

- <a href="https://newt239.github.io/local-font-emulator/" target="_blank">Local Font Emulator</a>

## 機能について

和文フォントフィルターを搭載しています。

ウェブブラウザにはフォントのフォールバック機能が搭載されているため、フォントに該当の文字が存在しない場合代替のフォントが表示されています。Local Font Emulator では CSS の`font-family`プロパティで、2 つ目のフォントに`Tofu`を設定することで、文字が存在しなかった場合に豆腐文字が表示されるようにしています。
