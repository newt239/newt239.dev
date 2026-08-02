<script setup lang="ts">
defineProps<{
  filterLabel: string;
  filterLabelId: string;
  sortLabelId: string;
  sortAsc: boolean;
}>();

const emit = defineEmits<{
  "update:sortAsc": [boolean];
}>();
</script>

<template>
  <div class="list-controls">
    <div class="control-row filter-row">
      <span :id="filterLabelId" class="control-label">{{ filterLabel }}</span>
      <div class="filter-chips" role="group" :aria-labelledby="filterLabelId">
        <slot />
      </div>
    </div>
    <div class="control-divider" aria-hidden="true" />
    <div class="control-row sort-row">
      <span :id="sortLabelId" class="control-label">並び替え</span>
      <SortControl
        :sort-asc="sortAsc"
        :label-id="sortLabelId"
        @update:sort-asc="emit('update:sortAsc', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.list-controls {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  width: fit-content;
  max-width: 100%;
  margin: 0 0 1.5rem auto;
  padding: 0.5rem 0.75rem;
  border: var(--border-width) solid rgb(var(--surface));
  border-radius: var(--radius-md);

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.5rem;
    row-gap: 0.75rem;
    width: 100%;
    margin-left: 0;
    align-items: center;
  }
}

.control-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;

  @media (max-width: 600px) {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
    align-items: center;
  }
}

.control-label {
  font-size: 0.875rem;
  color: rgb(var(--text-muted));
  flex-shrink: 0;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
  min-width: 0;
}

@media (max-width: 600px) {
  .sort-row :deep(.sort-segmented) {
    justify-self: start;
  }
}

.control-divider {
  align-self: stretch;
  border-left: var(--border-width) solid rgb(var(--surface));
  flex-shrink: 0;

  @media (max-width: 600px) {
    grid-column: 1 / -1;
    align-self: auto;
    width: 100%;
    border-left: none;
    border-top: var(--border-width) solid rgb(var(--surface));
  }
}
</style>
