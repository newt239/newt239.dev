<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";
import ArticleItem from "./ArticleItem.vue";

const { data: articles } = await useAsyncData("latest-articles", () =>
  queryCollection("articles").order("date", "DESC").limit(5).all()
);
</script>

<template>
  <div class="latest-article-list">
    <h2 v-colorful-heading class="category-title" lang="en">Articles</h2>
    <div class="article-grid">
      <ArticleItem
        v-for="article in articles ?? []"
        :key="article.url"
        :title="article.title"
        :url="article.url"
        :date="article.date"
      />
      <NuxtLink to="/articles" class="see-all-articles">
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
    border: var(--border-width) solid transparent;
    border-radius: var(--radius-md);
    background: rgb(var(--surface));
    color: rgb(var(--text));
    transition: var(--transition);

    @media (hover: hover) {
      &:hover {
        border-color: rgb(var(--text));
      }
    }

    @media (hover: none) {
      &:active {
        border-color: rgb(var(--text));
      }
    }
  }
}
</style>
