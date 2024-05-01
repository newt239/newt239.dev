<script setup lang="ts">
import dayjs from "dayjs";
import { IconBook2 } from "@tabler/icons-vue";
import { articleList } from "~/libs/articles";

useHead({
  title: "記事一覧 - newt239.dev",
});
</script>

<template>
  <main>
    <div class="container articleListPage">
      <h2 class="categoryName">Articles</h2>
      <div class="articles">
        <ul>
          <li v-for="article in articleList" :key="article.title">
            <img v-if="article.url.startsWith('https://qiita.com')" src="/qiita.png" class="site-icon icon-align"
              alt="Qiitaのアイコン" />
            <img v-else-if="article.url.startsWith('https://zenn.dev')" src="/zenn.png" class="site-icon icon-align"
              alt="Zennのアイコン" />
            <span v-else class="site-icon">
              <IconBook2 class="icon-align" width="16px" height="16px" />
            </span>
            <a :href="article.url" target="_blank" class="underline">{{ article.title }}</a> ……
            <span :title="dayjs(article.date).format('YYYY年MM月DD日')">{{
            dayjs(article.date).format("YY.MM.DD")
          }}</span>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style>
.articleListPage {
  .categoryName {
    view-transition-name: article-category-name;
  }

  ul {
    line-height: 3;
    margin: 0;
  }
}
</style>
