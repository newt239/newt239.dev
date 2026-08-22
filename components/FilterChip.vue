<script setup lang="ts">
import { IconCheck } from "@tabler/icons-vue";

defineProps<{
  active: boolean;
}>();
</script>

<template>
  <button class="filter-chip" :class="{ active }" :aria-pressed="active">
    <IconCheck v-if="active" :size="16" class="filter-chip-icon" aria-hidden="true" />
    <span><slot /></span>
  </button>
</template>

<style scoped>
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: var(--tap-target-size);
  font-family: inherit;
  font-size: 0.875rem;
  padding: 0 0.875rem;
  border-radius: var(--radius-sm);
  border: none;
  background: rgb(var(--surface));
  color: rgb(var(--text));
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;

  @media (hover: hover) {
    &:not(.active):hover {
      background: rgb(var(--surface-hover));
    }

    &.active:hover {
      opacity: var(--hover-opacity);
    }
  }

  &.active {
    background: rgb(var(--text));
    color: rgb(var(--bg));
  }

  .filter-chip-icon {
    flex-shrink: 0;
  }
}
</style>
