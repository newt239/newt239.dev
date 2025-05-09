---
title: Quiz Flasher
thumbnail: quiz-flasher.webp
alt: モバイル UI を 3 画面並列にキャプチャした Web アプリ「Quiz Flasher」のダークテーマ画面。左端はホーム画面で、「このサイトは何？」「プリセット」「その他のツール」「このWebアプリについて」という見出しが並ぶ。中央はクイズ出題画面で、画面上からシート IDとシート名、「次の問題」のボタン、問題文、橙色による正解文、回答履歴のテーブルが並ぶ。右端は「スプレッドシートのidから検索」画面で、URL入力欄と検索結果として抽出されたシート名一蘭があり、それぞれリンクテキストとして表示されている。
period: 2019.11 - 2020.07
tech:
  - GAS
---

問題データを入れた Google スプレッドシートのファイルから、ランダムに問題を出題する Web アプリです。すべてのシートから出題させたり、特定のシートの特定の問題のみで出題させることもできます。自分が JavaScript を初めて使って作った作品です。バックエンド的に使うのももちろんですが、モーダルウィンドウなどデザイン面で利用したのもこれが初でした。

<!--more-->

## API

クイズ出題の部分は API 化してあるので仕様を載せておきます。メソッドは全て GET です。メンテナンスはしていないためずっと使える保証はないです。なお LINE bot の方はこの API を利用しています。

### Base URL

`https://script.google.com/macros/s/AKfycbzOi_ACgcxDldiJ-8kVS5Hxxe8i37O168mubm95taRE7kAZ9a9Q/exec`

#### Parameter

| Property | Type    | Description                                                                                               |
| :------- | ------- | :-------------------------------------------------------------------------------------------------------- |
| t        | String  | タイプ。基本は show で固定                                                                                |
| p        | String  | スプレッドシートの id。非公開設定のものは無理                                                             |
| s        | Number  | シートの番号。0 を始点として何個目のシートか                                                              |
| o        | Boolean | オプショナル。 true にすると 4 列目の文字を回答の末尾に出力。作問者情報を入れたいときなどに使ってください |

### Example

#### Request: `GET`

`https://script.google.com/macros/s/AKfycbzOi_ACgcxDldiJ-8kVS5Hxxe8i37O168mubm95taRE7kAZ9a9Q/exec?t=show&p=1lnZuqxrFkku0qcfhe_ugUcH05qh7If1jV_g67WzlgH0&s=0`

#### Response

```json
[
  {
    "n": "abc the first:0001",
    "q": "「abc ～ the first ～」へようこそ！さて、ABC・・・と始まるアルファベットは、全部で何文字でしょう？",
    "a": "26 文字",
    "tag": ""
  },{
    "n": "abc the first:0002",
    "q": "人気漫画『ドラえもん』の登場人物で、ジャイアンの苗字は剛田ですが、スネ夫の苗字は何でしょう？",
    "a": "骨川（滑川も正解）",
    "tag": ""
  },{
    "n":"abc the first:0003",
    "q":"格闘家ボブ・サップの出身国はどこでしょう？",
    "a":"アメリカ",
    "tag":""
  }, ...
]
```

## 関連リンク

### Quiz Flasher

- <a href="https://script.google.com/macros/s/AKfycby0uoGf4OGDKWBvfDNUERpDD2M7sny83k9Oj9D69RjDTub4E_o/exec" target="_blank">ホーム｜ Quiz Flasher</a>

### abcLINEQUIZ [LINE bot]

- <a href="https://lin.ee/DidtKli" target="_blank">LINE Add Friend</a>
