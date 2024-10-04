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
      <div class="articleGrid">
        <ArticleItem v-for="article in articleList" :key="article.url" :title="article.title" :url="article.url"
          :date="article.date" />
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
