---
title: Lounge Books
thumbnail: lounge-books.webp
alt: Webアプリケーション「Lounge Books」のスクリーンショット。上部にヘッダーがあり、サイバーエージェントのイメージカラーである緑を使ったデザインで「Lounge Books」というタイトルと「本を登録する」というボタンが配置されている。そのすぐ下にセレクトボックスと検索ボックスがあり、セレクトボックスは「カード表示」が選択されている。その下には本のカードが並んでおり、それぞれのカード内でカバー画像が表示されている。「RESTful Webサービス」や「Pythonで理解する統計解析の基礎」「集合知プログラミング」などのタイトルが確認できる。

period: 2024.08 -
tech:
  - SvelteKit
  - Go
  - Docker
---

サイバーエージェントの技術コミュニティ「[CA Tech Lounge](https://www.cyberagent.co.jp/careers/special/students/tech_lounge/)」で、蔵書を確認するための Web アプリケーション「Lounge Books」を開発しました。ラウンジには多数の技術書があり、ひと目で目的の本があるかどうかを確認するのが難しかったため、手元でどこからでも検索ができるよう、蔵書管理アプリを開発することになりました。

私は主にフロントエンドを担当しており、SvelteKit で開発し、Cloudflare Pages にデプロイしています。すべての本についている「ISBN」と呼ばれる番号から書籍データを取得できる API を活用することで、登録時の手間を省いています。
