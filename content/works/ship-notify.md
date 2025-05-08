---
title: SHIP Notify
thumbnail: ship-info.webp
alt: Discordデスクトップアプリのサーバー「SHIP Info」のチャンネル「高校連絡事項」を表示したスクリーンショット。左側のナビゲーションにはカテゴリー別チャンネルが並び、メッセージエリアにはBOT「SHIP-Assistant」が「高校1年 日帰り校外学習の目的地変更について」や「第42回 卒業証書授与式 ライブ配信」など学内連絡をカード形式で投稿している。
github: newt239/SHIP-notify-public
period: 2021.01 - 2022.04
tech:
  - Discord.py
  - Selenium
  - Heroku
  - Firebase
---

<a href="https://ship.sakae-higashi.jp/" target="_blank">SHIP</a> （ Sakae Higashi Internet Program ） や栄東中高ホームページの栄東ニュースを定期的にスクレイピングし、更新があれば通知するシステムです。SHIP の閉鎖に伴いサービスの提供を終了しました。

<!--more-->

## システム構成

Discord のサーバーと LINE 公式アカウント、Twitter、Web で運用していました。Discord.py を Heroku 上で常時稼働させ、10 分おきにループを回し予めセットしておいた時間になると SHIP や栄東ニュースのスクレイピングなどを行います。

スクレイピングには selenium を使っています。中高それぞれの「連絡事項」「学習教材」「学校通信」のページを 1 日 2 ～ 5 回程度取得しています。データベースに保存されていないものが見つかればそのリンクをクリックし、説明文やファイルのダウンロードと SHIP-notify 側のデータベースへのアップロードを行います。

![SHIP-Assistantのシステム構成図。2021年7月31日現在のもので、バージョン1.1と記載されている。Heroku上のdiscord.pyアプリがSeleniumで学内サイトを巡回し、Cloud FirestoreとCloud Storageに投稿とPDFを格納。同時にDiscordやLINE、Twitterへ通知している。データはFirebase Hostingでも確認でき、Firebase Authenticationで認証している。](/images/ship-assistant-system-map.webp)

## Web 版

認証に Firebase Authentication を通し学校以外のドメインのアカウントからのログインをブロックしています。

![Webアプリ「SHIP-Assistant on Web」の投稿詳細ページ。パンくずリスト「ホーム / 投稿一覧 / 3月営業予定(改訂版)」に続き、見出し「3月営業予定(改訂版)」が表示されている。その下の表で titleが3月営業予定(改訂版)、channelが高校学校通信、idが2559、dateが2022/03/04、folderが購買営業予定/R3 であることが分かる。下部のFiles セクションには PDFファイルへのリンクが配置されている。](/images/ship-assistant-web.webp)

## データベース

当初は Heroku 上での利用がサポートされている Heroku Postgres を使っていましたが、Web 版の実装に伴いクライアント側から直接データの取得が可能な Firebase Cloud Firestore へ移行しました。

## 関連リンク

### SHIP-Assistant on Web

- <a href="https://ship-assistant.web.app/" target="_blank">SHIP-Asisstant</a>

### Notion 上で利用方法を説明したページ

- <a href="https://www.notion.so/newt-house/SHIP-Assistant-s-Note-c599cf2125364a80920b0447f76d717a" target="_blank">SHIP Assistant's Note</a>
