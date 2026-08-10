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
  background: rgb(var(--surface));
  border-radius: var(--radius-md);
  overflow: hidden;
}

.certification-item {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.75rem 1.25rem;

  &:not(:last-child) {
    border-bottom: var(--border-width-hairline) solid rgb(var(--border));
  }
}

.item-term {
  font-size: 0.875rem;
  color: rgb(var(--text-muted));
  white-space: nowrap;
  min-width: 6rem;
  flex-shrink: 0;
}

.item-title {
  font-weight: 600;
  font-size: 1rem;
  line-height: var(--line-height-tight);
}
</style>
