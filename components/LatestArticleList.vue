<script setup lang="ts">
import { IconBook2, IconChevronRight } from "@tabler/icons-vue";
import { articleList } from "~/libs/articles";

const articles = articleList.slice(0, 5);
</script>

<template>
  <div class="latestArticleList">
    <h2>Articles</h2>
    <div class="cardGrid">
      <a v-for="article in articles" :key="article.url" :href="`${article.url}`" target="_blank" class="card">
        <div class="card-body">
          <h4>{{ article.title }}</h4>
        </div>
        <div class="card-footer">
          <div>
            <img v-if="article.url.startsWith('https://qiita.com')" src="/qiita.png" class="site-icon icon-align"
              alt="Qiitaのアイコン" />
            <img v-else-if="article.url.startsWith('https://zenn.dev')" src="/zenn.png" class="site-icon icon-align"
              alt="Zennのアイコン" />
            <span v-else class="site-icon">
              <IconBook2 class="icon-align" width="16px" height="16px" />
            </span>
            <span class="site-name">{{ article.url.split("/")[2] }}</span>
          </div>
          <div>{{ article.date }}</div>
        </div>
      </a>
      <a href="/articles" class="see-all-articles">
        <span>
          すべての作品を見る
          <IconChevronRight />
        </span>
      </a>
    </div>
  </div>
</template>

<style>
.latestArticleList {
  .cardGrid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

    a.card {
      display: grid;
      grid-template-rows: subgrid;
      grid-row: span 2;
      color: rgb(var(--color-text));
      background-color: rgb(var(--color-black-secondary));
      border-radius: 0.5rem;
      filter: drop-shadow(2px 4px 6px black);

      .card-body {
        padding: 1rem;

        h4 {
          padding: 0;
        }
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        padding: 1rem;

        .site-name {
          color: rgb(var(--color-text-secondary));
        }
      }
    }
  }

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

  .see-all-articles {
    display: grid;
    grid-row: span 2;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 1rem 0;
    border-radius: 0.5rem;
    border: 2px solid rgb(var(--color-black-secondary));
    color: rgb(var(--color-text));
    background-color: rgb(var(--color-black));
    filter: drop-shadow(2px 4px 6px black);
  }
}
</style>
