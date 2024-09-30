<script setup lang="ts">
interface Props {
  title: string;
  url: string;
  date: string;
}
const props = defineProps<Props>();
</script>

<template>
  <a :href="`${props.url}`" target="_blank" class="card">
    <div class="cardBody">
      <h4>{{ props.title }}</h4>
    </div>
    <div class="card-footer">
      <div>
        <img v-if="props.url.startsWith('https://qiita.com')" src="/qiita.png" class="siteIcon iconAlign"
          alt="Qiitaのアイコン" />
        <img v-else-if="props.url.startsWith('https://zenn.dev')" src="/zenn.png" class="siteIcon iconAlign"
          alt="Zennのアイコン" />
        <span v-else class="siteIcon">
          <IconBook2 class="iconAlign" width="16px" height="16px" />
        </span>
        <span class="site-name">{{ props.url.split("/")[2] }}</span>
      </div>
      <div>{{ props.date }}</div>
    </div>
  </a>
</template>