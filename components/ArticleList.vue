<script setup lang="ts">
import dayjs from "dayjs";

import Book2Icon from "~/components/icons/Book2Icon.vue";

type ArticleProp = {
  title: string;
  url: string;
  date: string;
};

const articleList: ArticleProp[] = [
  {
    title: "【Next.js + Panda CSS】メニューバーで現在のページだけ色を変える",
    url: "https://qiita.com/newt239/items/816db98098c94632cf57",
    date: "2023/08/15",
  },
  {
    title:
      "Webからローカルフォントのデータを取得する～Local Font Access APIとは～",
    url: "https://zenn.dev/newt_st21/articles/local-font-access-api-chromium",
    date: "2023/07/16",
  },
  {
    title: "CSS のブラーと mix-blend-mode を同時に使うとチラつく",
    url: "https://zenn.dev/newt_st21/articles/chromium-bug-of-rendering-artifacts",
    date: "2023/05/04",
  },
  {
    title: "Nuxt3をSSGモードでCloudflare Pagesにデプロイする",
    url: "https://qiita.com/newt239/items/4a28405d03bd7310189f",
    date: "2023/03/27",
  },
  {
    title: "競技クイズ用得点表示ソフト「Score Watcher」を開発しました",
    url: "https://zenn.dev/newt_st21/articles/score-watcher-quiz-scoreboard-app",
    date: "2023/02/11",
  },
  {
    title: "Deno + Fresh で OAuth2 認証！",
    url: "https://qiita.com/newt239/items/a8ae4443aee014d3b725",
    date: "2022/12/30",
  },
  {
    title: "文化祭で滞在状況記録システムを運用しました",
    url: "https://zenn.dev/newt_st21/articles/gateway-stay-status-record-system",
    date: "2022/12/26",
  },
  {
    title: "Heroku上でdiscordgoを使ってbotを動かす",
    url: "https://zenn.dev/newt_st21/articles/discordgo-with-heroku",
    date: "2022/08/21",
  },
  {
    title: "Googleフォームが送信されたときにGASでいろいろする",
    url: "https://zenn.dev/newt_st21/articles/using-gas-on-submit-google-form",
    date: "2022/08/17",
  },
  {
    title: "Vue3でGSAPを使ってページ遷移時のアニメーションを実装する",
    url: "https://qiita.com/newt239/items/9bbedc1d2b2f73e71728",
    date: "2022/03/16",
  },
];
</script>

<template>
  <div class="articleList">
    <h2>Articles</h2>
    <ul>
      <li v-for="article in articleList" :key="article.title">
        <img
          v-if="article.url.startsWith('https://qiita.com')"
          src="/qiita.png"
          class="site-icon icon-align"
          alt="Qiitaのアイコン"
        />
        <img
          v-else-if="article.url.startsWith('https://zenn.dev')"
          src="/zenn.png"
          class="site-icon icon-align"
          alt="Zennのアイコン"
        />
        <span v-else src="/zenn.png" class="site-icon"
          ><Book2Icon class="icon-align" width="16px" height="16px"
        /></span>
        <a :href="article.url" target="_blank">{{ article.title }}</a> ……
        <span :title="dayjs(article.date).format('YYYY年MM月DD日')">{{
          dayjs(article.date).format("YY.MM.DD")
        }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.articleList {
  ul {
    line-height: 2;
    margin: 0;
  }
  .site-icon {
    height: 16px;
    padding-right: 0.3rem;
  }
  .icon-align {
    vertical-align: -0.15rem;
  }
}
</style>
