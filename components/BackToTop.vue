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
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    width: 100%;
    max-width: 320px;
    padding: 0.75rem 1.5rem;
    color: rgb(var(--text));
    background-color: rgb(var(--surface));
    border: 1.5px solid rgb(var(--border));
    border-radius: 0.625rem;
    transition: all 0.2s;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    @media (hover: hover) {
      &:hover {
        background-color: rgb(var(--surface-hover));
        border-color: rgb(var(--accent));
        color: rgb(var(--accent));
      }
    }

    @media (hover: none) {
      &:active {
        background-color: rgb(var(--surface-hover));
      }
    }
  }
}
</style>
