---
title: Lounge Books
thumbnail: lounge-books.webp
period: 2024.08 -
tech: SvelteKit, Go, Docker
---

サイバーエージェントの技術コミュニティ「[CA Tech Lounge](https://www.cyberagent.co.jp/careers/special/students/tech_lounge/)」で、蔵書を確認するための Web アプリケーション「Lounge Books」を開発しました。ラウンジには多数の技術書があり、ひと目で目的の本があるかどうかを確認するのが難しかったため、手元でどこからでも検索ができるよう、蔵書管理アプリを開発することになりました。

私は主にフロントエンドを担当しており、SvelteKit で開発し、Cloudflare Pages にデプロイしています。すべての本についている「ISBN」と呼ばれる番号から書籍データを取得できる API を活用することで、登録時の手間を省いています。
