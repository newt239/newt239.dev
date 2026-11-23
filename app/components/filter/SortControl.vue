<script setup lang="ts">
import { IconCheck } from "@tabler/icons-vue";

defineProps<{
  labelId: string;
}>();

const sortAsc = defineModel<boolean>("sortAsc", { required: true });
</script>

<template>
  <div class="sort-segmented" role="group" :aria-labelledby="labelId">
    <button
      type="button"
      class="chip-button sort-segment"
      :aria-pressed="!sortAsc"
      @click="sortAsc = false"
    >
      <IconCheck v-if="!sortAsc" :size="16" class="sort-segment-icon" aria-hidden="true" />
      <span>新しい順</span>
    </button>
    <button
      type="button"
      class="chip-button sort-segment"
      :aria-pressed="sortAsc"
      @click="sortAsc = true"
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
  background: oklch(var(--surface));
  border-radius: var(--radius-sm);
}

.sort-segment {
  padding: 0 min(1rem, 3vw);

  &:first-child {
    border-start-start-radius: var(--radius-sm);
    border-end-start-radius: var(--radius-sm);
  }

  &:last-child {
    border-start-end-radius: var(--radius-sm);
    border-end-end-radius: var(--radius-sm);
  }

  &[aria-pressed="true"] {
    font-weight: 800;
  }

  .sort-segment-icon {
    flex-shrink: 0;
  }
}
</style>
