<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";
import { articleList } from "~/libs/articles";
import ArticleItem from "./ArticleItem.vue";

const articles = articleList.slice(0, 5);
</script>

<template>
  <div class="latest-article-list">
    <h2 class="category-title" lang="en">Articles</h2>
    <div class="article-grid">
      <ArticleItem
        v-for="article in articles"
        :key="article.url"
        :title="article.title"
        :url="article.url"
        :date="article.date"
      />
      <NuxtLink to="/articles" class="see-all-articles">
        <span>
          すべての記事を見る
          <IconChevronRight aria-hidden />
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
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .see-all-articles {
    display: grid;
    grid-row: span 2;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 1rem 0;
    border-radius: 0.75rem;
    background: rgb(var(--surface));
    color: rgb(var(--text));
    transition: background 0.2s;

    @media (hover: hover) {
      &:hover {
        background: rgb(var(--surface-hover));
      }
    }

    @media (hover: none) {
      &:active {
        background: rgb(var(--surface-hover));
      }
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
}
</style>
