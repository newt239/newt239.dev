<script setup lang="ts">
import { IconAdjustmentsHorizontal, IconFilterCheck } from "@tabler/icons-vue";

const props = defineProps<{
  filterLabel: string;
  sortAsc: boolean;
  hasConditions: boolean;
  dirty: boolean;
}>();

const emit = defineEmits<{
  "update:sortAsc": [boolean];
  apply: [];
}>();

const panelId = useId();
const filterLabelId = useId();
const sortLabelId = useId();

const toggleRef = useTemplateRef<HTMLButtonElement>("toggle");
const isOpen = ref(false);

onMounted(() => {
  if (props.hasConditions) isOpen.value = true;
});

const apply = async () => {
  emit("apply");
  isOpen.value = false;
  await nextTick();
  toggleRef.value?.focus();
};
</script>

<template>
  <div class="list-controls">
    <button
      ref="toggle"
      type="button"
      class="list-controls-toggle"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      @click="isOpen = !isOpen"
    >
      <IconAdjustmentsHorizontal :size="18" aria-hidden="true" />
      <span>フィルター</span>
    </button>

    <div :id="panelId" class="list-controls-panel" :class="{ 'is-open': isOpen }">
      <div class="control-row">
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
      <div class="control-actions">
        <button
          type="button"
          class="control-button primary"
          :disabled="!dirty"
          @click="apply"
        >
          <IconFilterCheck :size="16" aria-hidden="true" />
          <span>適用する</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-controls {
  display: contents;
}

.list-controls-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: var(--tap-target-size);
  padding: 0 0.875rem;
  font-family: inherit;
  font-size: 0.875rem;
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-sm);
  background: rgb(var(--surface));
  color: rgb(var(--text));
  cursor: pointer;
  transition: var(--transition);

  @media (hover: hover) {
    &:hover {
      border-color: rgb(var(--text));
    }
  }

  @media (hover: none) {
    &:active {
      border-color: rgb(var(--text));
    }
  }
}

.list-controls-panel {
  grid-column: 1 / -1;
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  max-width: 100%;
  padding-inline: 0.75rem;
  border: var(--border-width) solid rgb(var(--surface));
  border-radius: var(--radius-md);
  overflow: hidden;
  visibility: hidden;
  height: 0;
  margin-block-start: 0;
  padding-block: 0;
  border-block-width: 0;
  opacity: 0;
  translate: 0 -0.25rem;
  transition:
    height var(--transition-duration) var(--transition-easing),
    margin-block-start var(--transition-duration) var(--transition-easing),
    padding-block var(--transition-duration) var(--transition-easing),
    border-block-width var(--transition-duration) var(--transition-easing),
    opacity var(--transition-duration) var(--transition-easing),
    translate var(--transition-duration) var(--transition-easing),
    visibility var(--transition-duration);

  &.is-open {
    visibility: visible;
    height: auto;
    margin-block-start: var(--list-header-row-gap);
    padding-block: 0.5rem;
    border-block-width: var(--border-width);
    opacity: 1;
    translate: 0 0;
  }

  @media (max-width: 37.5rem) {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.5rem;
    row-gap: 0.75rem;
    justify-self: stretch;
    align-items: center;

    @container (max-width: 16em) {
      & {
        grid-template-columns: 1fr;
        row-gap: 0.5rem;
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.control-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;

  @media (max-width: 37.5rem) {
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

@media (max-width: 37.5rem) {
  .sort-row :deep(.sort-segmented) {
    justify-self: start;
  }
}

.control-divider {
  align-self: stretch;
  border-left: var(--border-width) solid rgb(var(--surface));
  flex-shrink: 0;

  @media (max-width: 37.5rem) {
    grid-column: 1 / -1;
    align-self: auto;
    width: 100%;
    border-left: none;
    border-top: var(--border-width) solid rgb(var(--surface));
  }
}

.control-actions {
  display: flex;
  align-items: center;
  gap: 0.375rem;

  @media (max-width: 37.5rem) {
    grid-column: 1 / -1;
    justify-content: flex-end;
  }
}

.control-button {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: var(--tap-target-size);
  padding: 0 0.875rem;
  font-family: inherit;
  font-size: 0.875rem;
  border: none;
  border-radius: var(--radius-sm);
  background: rgb(var(--surface));
  color: rgb(var(--text));
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;

  @media (hover: hover) {
    &:not(:disabled):hover {
      background: rgb(var(--surface-hover));
    }
  }

  &.primary {
    background: rgb(var(--text));
    color: rgb(var(--bg));
    font-weight: 700;

    @media (hover: hover) {
      &:not(:disabled):hover {
        background: rgb(var(--text));
        opacity: var(--hover-opacity);
      }
    }
  }

  &:disabled {
    background: rgb(var(--surface));
    color: rgb(var(--text-faint));
    cursor: default;
  }
}
</style>
