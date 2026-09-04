<script setup lang="ts">
import { IconCheck } from "@tabler/icons-vue";

defineProps<{
  active: boolean;
}>();
</script>

<template>
  <button type="button" class="filter-chip" :class="{ active }" :aria-pressed="active">
    <IconCheck v-if="active" :size="16" class="filter-chip-icon" aria-hidden="true" />
    <span><slot /></span>
  </button>
</template>

<style scoped>
.filter-chip {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  min-height: var(--tap-target-size);
  padding: 0 1rem;
  font-family: inherit;
  font-size: 1rem;
  color: rgb(var(--text));
  white-space: nowrap;
  cursor: pointer;
  background: rgb(var(--surface));
  border: none;
  border-radius: var(--radius-sm);
  transition: var(--transition);

  @media (hover: hover) {
    &:not(.active):hover {
      background: rgb(var(--surface-hover));
    }

    &.active:hover {
      opacity: var(--hover-opacity);
    }
  }

  &.active {
    color: rgb(var(--bg));
    background: rgb(var(--text));
  }

  .filter-chip-icon {
    flex-shrink: 0;
  }
}
</style>
