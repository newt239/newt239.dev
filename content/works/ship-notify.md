---
title: SHIP Notify
thumbnail: ship-info.webp
github: newt239/SHIP-notify-public
creation: 2021.01 - 2022.04
tech: Discord.py, Selenium, Heroku, Firebase
---

<a href="https://ship.sakae-higashi.jp/" target="_blank">SHIP</a> （ Sakae Higashi Internet Program ） や栄東中高ホームページの栄東ニュースを定期的にスクレイピングし、更新があれば通知するシステムです。SHIP の閉鎖に伴いサービスの提供を終了しました。

<!--more-->

## システム構成

Discord のサーバーと LINE 公式アカウント、Twitter、Web で運用していました。Discord.py を Heroku 上で常時稼働させ、10 分おきにループを回し予めセットしておいた時間になると SHIP や栄東ニュースのスクレイピングなどを行います。

スクレイピングには selenium を使っています。中高それぞれの「連絡事項」「学習教材」「学校通信」のページを 1 日 2 ～ 5 回程度取得しています。データベースに保存されていないものが見つかればそのリンクをクリックし、説明文やファイルのダウンロードと SHIP-notify 側のデータベースへのアップロードを行います。

![システム構成図](/images/ship-assistant-system-map.webp)

## Web 版

認証に Firebase Authentication を通し学校以外のドメインのアカウントからのログインをブロックしています。

![Web版の画面](/images/ship-assistant-web.webp)

## データベース

当初は Heroku 上での利用がサポートされている Heroku Postgres を使っていましたが、Web 版の実装に伴いクライアント側から直接データの取得が可能な Firebase Cloud Firestore へ移行しました。

## 関連リンク

### SHIP-Assistant on Web

- <a href="https://ship-assistant.web.app/" target="_blank">SHIP-Asisstant</a>

### Notion 上で利用方法を説明したページ

- <a href="https://www.notion.so/newt-house/SHIP-Assistant-s-Note-c599cf2125364a80920b0447f76d717a" target="_blank">SHIP Assistant's Note</a>
