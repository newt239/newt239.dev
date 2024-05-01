<script setup lang="ts">
import dayjs from "dayjs";
import { IconBook2 } from "@tabler/icons-vue";
import { articleList } from "~/libs/articles";
</script>

<template>
  <div class="articleList">
    <h2>Articles</h2>
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
</template>

<style>
.articleList {
  ul {
    line-height: 3;
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
