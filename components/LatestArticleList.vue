<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";
import { articleList } from "~/libs/articles";
import ArticleItem from "./ArticleItem.vue";

const articles = articleList.slice(0, 5);

</script>

<template>
  <div class="latest-article-list">
    <h2 class="category-title">Articles</h2>
    <div class="article-grid">
      <ArticleItem
v-for="article in articles" :key="article.url" :title="article.title" :url="article.url"
        :date="article.date" />
      <NuxtLink to="/articles" class="see-all-articles">
        <span>
          すべての記事を見る
          <IconChevronRight />
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style>
.article-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.latest-article-list {
  .category-title {
    view-transition-name: article-category-name;
  }

  .see-all-articles {
    display: grid;
    grid-row: span 2;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 1rem 0;
    border-radius: 0.5rem;
    border: 2px solid rgb(var(--color-text));
    color: rgb(var(--color-text));
    background-color: rgb(var(--color-back));
    transition: all 0.2s;

    @media (hover: hover) {
      &:hover {
        scale: 1.05;
      }
    }

    @media (hover: none) {
      &:active {
        scale: 1.05;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
}
</style>
