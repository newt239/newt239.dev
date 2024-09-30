<script setup lang="ts">
import { IconBook2, IconChevronRight } from "@tabler/icons-vue";
import { articleList } from "~/libs/articles";

const articles = articleList.slice(0, 5);

const getSiteName = (url: string) => {
  if (url.startsWith("https://qiita.com")) {
    return "Qiita";
  } else if (url.startsWith("https://zenn.dev")) {
    return "Zenn";
  } else if (url.startsWith("https://newt239.hatenablog.com/")) {
    return "はてな";
  } else {
    return url.split("/")[2];
  }
};
</script>

<template>
  <div class="latestArticleList">
    <h2 class="categoryTitle">Articles</h2>
    <div class="cardGrid">
      <a v-for="article in articles" :key="article.url" :href="`${article.url}`" target="_blank" class="card">
        <div class="cardBody">
          <h4>{{ article.title }}</h4>
        </div>
        <div class="card-footer">
          <div>
            <img v-if="article.url.startsWith('https://qiita.com')" src="/qiita.png" class="siteIcon iconAlign"
              alt="Qiitaのアイコン" />
            <img v-else-if="article.url.startsWith('https://zenn.dev')" src="/zenn.png" class="siteIcon iconAlign"
              alt="Zennのアイコン" />
            <span v-else class="siteIcon">
              <IconBook2 class="iconAlign" width="24px" height="24px" style="vertical-align: -0.35rem;" />
            </span>
            <span class="site-name">{{ getSiteName(article.url) }}</span>
          </div>
          <div>{{ article.date }}</div>
        </div>
      </a>
      <NuxtLink to="/articles" class="seeAllArticles">
        <span>
          すべての記事を見る
          <IconChevronRight />
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style>
.latestArticleList {
  .categoryTitle {
    view-transition-name: article-category-name;
  }

  .cardGrid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

    a.card {
      display: grid;
      grid-template-rows: subgrid;
      grid-row: span 2;
      gap: 0;
      color: rgb(var(--color-text));
      background-color: rgb(var(--color-back));
      border: 2px solid rgb(var(--color-text));
      border-radius: 0.5rem;
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

      .cardBody {
        padding: 1rem;

        h4 {
          padding: 0;
        }
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        color: rgb(var(--color-text-secondary));
      }
    }
  }

  .seeAllArticles {
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
  }
}
</style>
