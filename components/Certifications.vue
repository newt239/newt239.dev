<script setup lang="ts">
type Certification = {
  year: number;
  month: number;
  title: string;
};

const certifications: Certification[] = [
  { year: 2026, month: 7, title: "色彩検定 2級" },
  { year: 2025, month: 7, title: "色彩検定 UC級" },
  { year: 2025, month: 4, title: "応用情報技術者試験" },
  { year: 2025, month: 3, title: "普通自動車第一種運転免許" },
  { year: 2022, month: 4, title: "基本情報技術者試験" },
];
</script>

<template>
  <div class="certifications">
    <h2 v-colorful-heading class="category-title" lang="en">Certifications</h2>
    <div class="certification-list">
      <div v-for="item in certifications" :key="item.title" class="certification-item">
        <time :datetime="`${item.year}-${String(item.month).padStart(2, '0')}`" class="item-term">{{ item.year }}年{{ item.month }}月</time>
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
  line-height: 1.5;
}
</style>
