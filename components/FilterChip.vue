<script setup lang="ts">
import { IconCheck } from "@tabler/icons-vue";

defineProps<{
  active: boolean;
}>();
</script>

<template>
  <button type="button" class="chip-button filter-chip" :class="{ active }" :aria-pressed="active">
    <IconCheck v-if="active" :size="16" class="filter-chip-icon" aria-hidden="true" />
    <span><slot /></span>
  </button>
</template>

<style scoped>
.filter-chip {
  padding: 0 1rem;
  background: oklch(var(--surface));
  border-radius: var(--radius-sm);

  @media (hover: hover) {
    &:not(.active):hover {
      background: oklch(var(--surface-hover));
    }

    &.active:hover {
      opacity: var(--hover-opacity);
    }
  }

  &.active {
    color: oklch(var(--bg));
    background: oklch(var(--text));

    @media (forced-colors: active) {
      color: HighlightText;
      background: Highlight;
      border-color: Highlight;
    }
  }

  .filter-chip-icon {
    flex-shrink: 0;
  }
}
</style>
