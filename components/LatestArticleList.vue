<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";
import { articleList } from "~/libs/articles";

const articles = articleList.toSorted((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
</script>

<template>
  <div class="latest-article-list">
    <h2 v-colorful-heading class="category-title" lang="en">Articles</h2>
    <div class="article-grid">
      <ArticleItem
        v-for="article in articles"
        :key="article.url"
        :title="article.title"
        :url="article.url"
        :date="article.date"
      />
      <NuxtLink to="/articles" class="see-all-card see-all-articles">
        <span>
          すべての記事を見る
          <IconChevronRight aria-hidden="true" />
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style>
.latest-article-list {
  .category-title {
    view-transition-name: article-category-name;
  }

  .article-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--card-min-width), 1fr));
    gap: 1rem;
  }

  .see-all-articles {
    grid-row: span 2;
  }
}
</style>
