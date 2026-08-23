<script lang="ts" setup>
import { IconChevronLeft } from "@tabler/icons-vue";
</script>

<template>
  <div class="back-to-top">
    <NuxtLink class="back" to="/">
      <IconChevronLeft />
      トップへ戻る
    </NuxtLink>
  </div>
</template>

<style scoped>
.back-to-top {
  padding: 2rem 0 1rem;
  text-align: center;

  .back {
    display: inline-flex;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 320px;
    padding: 0.75rem 1.5rem;
    color: rgb(var(--text));
    background-color: rgb(var(--surface));
    border: var(--border-width) solid transparent;
    border-radius: var(--radius-sm);
    transition: var(--transition);

    @media (hover: hover) {
      &:hover {
        color: rgb(var(--text));
        border-color: rgb(var(--text));
      }
    }

    @media (hover: none) {
      &:active {
        border-color: rgb(var(--text));
      }
    }
  }
}
</style>
