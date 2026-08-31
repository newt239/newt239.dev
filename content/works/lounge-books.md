---
title: Lounge Books
period: 2024.08 -
tech:
  - SvelteKit
  - Go
  - Docker
images:
  - src: lounge-books.webp
    alt: 蔵書一覧の画面。緑を基調としたヘッダーの下に表示形式の切り替えと検索欄があり、技術書のカバー画像がカード状に並ぶ。
---

サイバーエージェントの技術コミュニティ「[CA Tech Lounge](https://www.cyberagent.co.jp/careers/special/students/tech_lounge/)」で、蔵書を確認するためのWebアプリケーション「Lounge Books」を開発しました。ラウンジには多数の技術書があり、ひと目で目的の本があるかどうかを確認するのが難しかったため、手元でどこからでも検索ができるよう、蔵書管理アプリを開発することになりました。

私は主にフロントエンドを担当しており、SvelteKitで開発し、Cloudflare Pagesにデプロイしています。すべての本についている「ISBN」と呼ばれる番号から書籍データを取得できるAPIを活用することで、登録時の手間を省いています。
