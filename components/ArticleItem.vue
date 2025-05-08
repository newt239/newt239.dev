<script setup lang="ts">
import { IconBook2 } from "@tabler/icons-vue";

interface Props {
  title: string;
  url: string;
  date: string;
}
const props = defineProps<Props>();

const getSiteName = (url: string) => {
  switch (true) {
    case url.startsWith("https://qiita.com/"):
      return "Qiita";
    case url.startsWith("https://zenn.dev/"):
      return "Zenn";
    case url.startsWith("https://newt239.hatenablog.com/"):
      return "はてな";
    case url.startsWith("https://note.com/"):
      return "note";
    case url.startsWith("https://developers.cyberagent.co.jp/"):
      return "CyberAgent";
    default:
      return url.split("/")[2];
  }
};
</script>

<template>
  <a :href="`${props.url}`" target="_blank" class="article-item">
    <div class="article-item-body">
      <h4>{{ props.title }}</h4>
    </div>
    <div class="article-item-footer">
      <div class="site-info">
        <NuxtImg v-if="props.url.startsWith('https://qiita.com/')" src="/qiita.png" alt="" width="16px" height="16px" />
        <NuxtImg v-else-if="props.url.startsWith('https://zenn.dev/')" src="/zenn.png" alt="" width="16px"
          height="16px" />
        <NuxtImg v-else-if="props.url.startsWith('https://newt239.hatenablog.com/')" src="/hatena.webp" alt=""
          width="16px" height="16px" />
        <IconBook2 v-else width="16px" height="16px" />
        <span class="site-name">{{ getSiteName(props.url) }}</span>
      </div>
      <div>{{ props.date }}</div>
    </div>
  </a>
</template>

<style>
.article-item {
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

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.site-info {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
}

.article-item-body {
  margin: 1rem;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  /* ブラウザがサポートしていない場合のフェールセーフ */
  height: 4.5rem;

  h4 {
    padding: 0;
  }
}

.article-item-footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  color: rgb(var(--color-text));
}
</style>
