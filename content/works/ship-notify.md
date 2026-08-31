---
title: SHIP Notify
github: newt239/SHIP-notify-public
period: 2021.01 - 2022.04
tech:
  - Discord.py
  - Selenium
  - Heroku
  - Firebase
images:
  - src: ship-info.webp
    alt: Discordのサーバー「SHIP Info」の「高校連絡事項」チャンネル。BOT「SHIP-Assistant」が校外学習の変更や卒業式のライブ配信といった学内連絡をカード形式で投稿している。
---

<a href="https://ship.sakae-higashi.jp/" target="_blank" rel="noopener noreferrer">SHIP</a>（Sakae Higashi Internet Program）や栄東中高ホームページの栄東ニュースを定期的にスクレイピングし、更新があれば通知するシステムです。SHIPの閉鎖に伴いサービスの提供を終了しました。

<!--more-->

## システム構成

DiscordのサーバーとLINE公式アカウント、Twitter、Webで運用していました。Discord.pyをHeroku上で常時稼働させ、10分おきにループを回し予めセットしておいた時間になるとSHIPや栄東ニュースのスクレイピングなどを行います。

スクレイピングにはseleniumを使っています。中高それぞれの「連絡事項」「学習教材」「学校通信」のページを1日2 ～ 5回程度取得しています。データベースに保存されていないものが見つかればそのリンクをクリックし、説明文やファイルのダウンロードとSHIP-notify側のデータベースへのアップロードを行います。

![SHIP-Assistant v1.1のシステム構成図（2021年7月）。discord.pyがSeleniumで学内サイトを巡回し、Cloud Firestoreに格納後Discord等へ通知する。](/images/ship-assistant-system-map.webp)

## Web 版

認証にFirebase Authenticationを通し学校以外のドメインのアカウントからのログインをブロックしています。

![Webアプリ「SHIP-Assistant on Web」の投稿詳細ページ。「3月営業予定(改訂版)」というエントリのタイトルや日付、PDFファイルへのリンクが表示されている。](/images/ship-assistant-web.webp)

## データベース

当初はHeroku上での利用がサポートされているHeroku Postgresを使っていました。Web版の実装に伴い、クライアント側から直接データを取得できるFirebase Cloud Firestoreへ移行しています。

## 関連リンク

### SHIP-Assistant on Web

- <a href="https://ship-assistant.web.app/" target="_blank" rel="noopener noreferrer">SHIP-Asisstant</a>

### Notion 上で利用方法を説明したページ

- <a href="https://www.notion.so/newt-house/SHIP-Assistant-s-Note-c599cf2125364a80920b0447f76d717a" target="_blank" rel="noopener noreferrer">SHIP Assistant's Note</a>
