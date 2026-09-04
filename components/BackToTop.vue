<script lang="ts" setup>
import { IconChevronLeft } from "@tabler/icons-vue";
</script>

<template>
  <div class="back-to-top">
    <NuxtLink class="back-button surface-button" to="/">
      <IconChevronLeft />
      トップへ戻る
    </NuxtLink>
  </div>
</template>

<style scoped>
.back-to-top {
  padding: 2rem 0 1rem;
  text-align: center;
}
</style>
