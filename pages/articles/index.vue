<script setup lang="ts">
import { articleList } from "~/libs/articles";

useHead({
  title: "記事一覧 - newt239.dev",
});
</script>

<template>
  <main>
    <div class="container article-list-page">
      <h2 class="category-name">Articles</h2>
      <div class="article-grid">
        <ArticleItem v-for="article in articleList" :key="article.url" :title="article.title" :url="article.url"
          :date="article.date" />
      </div>
    </div>
  </main>
</template>

<style>
.article-list-page {
  .category-name {
    view-transition-name: article-category-name;
  }

  ul {
    line-height: 3;
    margin: 0;
  }
}
</style>
