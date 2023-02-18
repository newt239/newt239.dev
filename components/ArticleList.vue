<script setup lang="ts">
import Parser from "rss-parser";
const parser = new Parser();
const articles = await parser.parseURL("https://zenn.dev/newt_st21/feed");
console.log(articles);
</script>

<template>
  <div v-show="articles && articles.length !== 0" class="workList">
    <h2>ARTICLES</h2>
    <ul>
      <li v-for="article in articles" :key="article.link">
        <a :href="article.link" target="_blank">{{ article.title }}</a>
      </li>
    </ul>
    <div class="articles"></div>
  </div>
</template>

<style lang="scss"></style>
