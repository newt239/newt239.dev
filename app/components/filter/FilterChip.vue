<script setup lang="ts">
import { IconCheck } from "@tabler/icons-vue";

defineProps<{
  active: boolean;
}>();
</script>

<template>
  <button type="button" class="chip-button filter-chip" :aria-pressed="active">
    <IconCheck v-if="active" :size="16" class="filter-chip-icon" aria-hidden="true" />
    <span><slot /></span>
  </button>
</template>

<style scoped>
.filter-chip {
  --chip-background: oklch(var(--surface));

  padding: 0 1rem;
  border-radius: var(--radius-sm);

  .filter-chip-icon {
    flex-shrink: 0;
  }
}
</style>
