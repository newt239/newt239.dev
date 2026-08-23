<script setup lang="ts">
import { certifications } from "~/libs/certifications";

const sortedCertifications = [...certifications].sort((a, b) => b.date.localeCompare(a.date));
</script>

<template>
  <div class="certifications">
    <h2 v-colorful-heading class="category-title" lang="en">Certifications</h2>
    <div class="certification-list">
      <div v-for="item in sortedCertifications" :key="item.title" class="certification-item">
        <time :datetime="item.date" class="item-term">{{ item.date.slice(0, 4) }}年{{ Number(item.date.slice(5)) }}月</time>
        <span class="item-title">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.certification-list {
  container-type: inline-size;
  overflow: hidden;
  background: rgb(var(--surface));
  border-radius: var(--radius-md);
}

.certification-item {
  display: flex;
  gap: 1rem;
  align-items: baseline;
  padding: 0.75rem 1.25rem;

  @container (max-width: 16em) {
    & {
      flex-direction: column;
      gap: 0.25rem;
      align-items: stretch;
    }
  }

  &:not(:last-child) {
    border-bottom: var(--border-width-hairline) solid rgb(var(--border));
  }
}

.item-term {
  flex-shrink: 0;
  min-width: min(6rem, 40%);
  font-size: 0.875rem;
  color: rgb(var(--text-muted));
  white-space: nowrap;
}

.item-title {
  min-width: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: var(--line-height-tight);
  overflow-wrap: anywhere;
}
</style>
