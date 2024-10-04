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
  <a :href="`${props.url}`" target="_blank" class="articleItem">
    <div class="articleItemBody">
      <h4>{{ props.title }}</h4>
    </div>
    <div class="articleItemFooter">
      <div>
        <img v-if="props.url.startsWith('https://qiita.com')" src="/qiita.png" class="siteIcon iconAlign"
          alt="Qiitaのアイコン" />
        <img v-else-if="props.url.startsWith('https://zenn.dev')" src="/zenn.png" class="siteIcon iconAlign"
          alt="Zennのアイコン" />
        <span v-else class="siteIcon">
          <IconBook2 class="iconAlign" width="16px" height="16px" />
        </span>
        <span class="siteName">{{ getSiteName(props.url) }}</span>
      </div>
      <div>{{ props.date }}</div>
    </div>
  </a>
</template>

<style>
.articleItem {
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

.articleItemBody {
  padding: 1rem;

  h4 {
    padding: 0;
  }
}

.articleItemFooter {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  color: rgb(var(--color-text-secondary));
}
</style>