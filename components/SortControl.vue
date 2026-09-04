<script setup lang="ts">
import { IconCheck } from "@tabler/icons-vue";

defineProps<{
  sortAsc: boolean;
  labelId: string;
}>();

const emit = defineEmits<{
  "update:sortAsc": [boolean];
}>();
</script>

<template>
  <div class="sort-segmented" role="group" :aria-labelledby="labelId">
    <button
      class="sort-segment"
      :class="{ active: !sortAsc }"
      :aria-pressed="!sortAsc"
      @click="sortAsc && emit('update:sortAsc', false)"
    >
      <IconCheck v-if="!sortAsc" :size="16" class="sort-segment-icon" aria-hidden="true" />
      <span>新しい順</span>
    </button>
    <button
      class="sort-segment"
      :class="{ active: sortAsc }"
      :aria-pressed="sortAsc"
      @click="!sortAsc && emit('update:sortAsc', true)"
    >
      <IconCheck v-if="sortAsc" :size="16" class="sort-segment-icon" aria-hidden="true" />
      <span>古い順</span>
    </button>
  </div>
</template>

<style scoped>
.sort-segmented {
  display: inline-flex;
  flex-wrap: wrap;
  max-width: 100%;
  background: rgb(var(--surface));
  border-radius: var(--radius-sm);
}

.sort-segment {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  min-height: var(--tap-target-size);
  padding: 0 min(1rem, 3vw);
  font-family: inherit;
  font-size: 1rem;
  color: rgb(var(--text));
  white-space: nowrap;
  cursor: pointer;
  background: transparent;
  border: none;
  transition: var(--transition);

  &:first-child {
    border-start-start-radius: var(--radius-sm);
    border-end-start-radius: var(--radius-sm);
  }

  &:last-child {
    border-start-end-radius: var(--radius-sm);
    border-end-end-radius: var(--radius-sm);
  }

  @media (hover: hover) {
    &:not(.active):hover {
      background: rgb(var(--surface-hover));
    }

    &.active:hover {
      opacity: var(--hover-opacity);
    }
  }

  &.active {
    font-weight: 800;
    color: rgb(var(--bg));
    background: rgb(var(--text));
  }

  .sort-segment-icon {
    flex-shrink: 0;
  }
}
</style>
