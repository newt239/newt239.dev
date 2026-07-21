<script setup lang="ts">
import { IconBook2 } from "@tabler/icons-vue";

interface Props {
  title: string;
  url: string;
  date: string;
}
const props = defineProps<Props>();

const transitionName = computed(
  () => `article-${props.url.replace(/^https?:\/\//, "").replace(/[^a-zA-Z0-9_-]/g, "-")}-title`
);

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
  <a :href="`${props.url}`" target="_blank" rel="noopener noreferrer" class="article-card">
    <div class="article-card-body">
      <h3 :style="`view-transition-name: ${transitionName};`">{{ props.title }}</h3>
    </div>
    <div class="article-card-footer">
      <div class="site-info">
        <NuxtImg v-if="props.url.startsWith('https://qiita.com/')" src="/qiita.webp" alt="" width="16" height="16" />
        <NuxtImg v-else-if="props.url.startsWith('https://zenn.dev/')" src="/zenn.png" alt="" width="16" height="16" />
        <NuxtImg v-else-if="props.url.startsWith('https://newt239.hatenablog.com/')" src="/hatena.webp" alt=""
          width="16" height="16" />
        <IconBook2 v-else :size="16" />
        <span class="site-name">{{ getSiteName(props.url) }}</span>
      </div>
      <time class="article-date">{{ props.date }}</time>
    </div>
  </a>
</template>

<style scoped>
.article-card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 2;
  gap: 0;
  color: rgb(var(--text));
  background: rgb(var(--surface));
  border: 2px solid transparent;
  border-radius: 0.75rem;
  overflow: hidden;
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

.site-info {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}

.site-name {
  font-size: 0.875rem;
  color: rgb(var(--text-muted));
}

.article-card-body {
  padding: 1rem 1rem 0.5rem;

  h3 {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}

.article-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem 1rem;
}

.article-date {
  font-size: 0.875rem;
  color: rgb(var(--text-muted));
  font-variant-numeric: tabular-nums;
}
</style>
