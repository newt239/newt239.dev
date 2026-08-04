<script setup lang="ts">
import { IconCheck } from "@tabler/icons-vue";

const props = defineProps<{
  sortAsc: boolean;
  labelId: string;
}>();

const emit = defineEmits<{
  "update:sortAsc": [boolean];
}>();

function setSort(asc: boolean) {
  if (props.sortAsc === asc) return;
  emit("update:sortAsc", asc);
}
</script>

<template>
  <div class="sort-segmented" role="group" :aria-labelledby="labelId">
    <button
      class="sort-segment"
      :class="{ active: !sortAsc }"
      :aria-pressed="!sortAsc"
      @click="setSort(false)"
    >
      <IconCheck v-if="!sortAsc" :size="16" class="sort-segment-icon" aria-hidden="true" />
      <span>新しい順</span>
    </button>
    <button
      class="sort-segment"
      :class="{ active: sortAsc }"
      :aria-pressed="sortAsc"
      @click="setSort(true)"
    >
      <IconCheck v-if="sortAsc" :size="16" class="sort-segment-icon" aria-hidden="true" />
      <span>古い順</span>
    </button>
  </div>
</template>

<style scoped>
.sort-segmented {
  display: inline-flex;
  background: rgb(var(--surface));
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.sort-segment {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 44px;
  padding: 0 0.875rem;
  font-family: inherit;
  font-size: 0.875rem;
  border: none;
  background: transparent;
  color: rgb(var(--text));
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;

  /* 親の .sort-segmented が overflow: hidden なので外側に描くとリングが隠れる */
  &:focus-visible {
    outline-offset: -2px;
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
    background: rgb(var(--text));
    color: rgb(var(--bg));
    font-weight: 700;
  }

  .sort-segment-icon {
    flex-shrink: 0;
  }
}
</style>
