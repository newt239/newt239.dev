<script setup lang="ts">
import { IconBook2 } from "@tabler/icons-vue";

interface Props {
  title: string;
  url: string;
  date: string;
}
const props = defineProps<Props>();

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
  <a :href="`${props.url}`" target="_blank" class="article-item">
    <div class="article-item-body">
      <h4>{{ props.title }}</h4>
    </div>
    <div class="article-item-footer">
      <div>
        <img v-if="props.url.startsWith('https://qiita.com')" src="/qiita.png" class="site-icon icon-align"
          alt="Qiitaのアイコン" />
        <img v-else-if="props.url.startsWith('https://zenn.dev')" src="/zenn.png" class="site-icon icon-align"
          alt="Zennのアイコン" />
        <span v-else class="site-icon">
          <IconBook2 class="icon-align" width="16px" height="16px" />
        </span>
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
}

.article-item-body {
  padding: 1rem;

  h4 {
    padding: 0;
  }
}

.article-item-footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  color: rgb(var(--color-text-secondary));
}
</style>