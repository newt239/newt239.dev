<script setup lang="ts">
type Certification = {
  term: string;
  title: string;
};

const certifications: Certification[] = [
  { term: "2026年7月", title: "色彩検定 2級 合格" },
  { term: "2025年7月", title: "色彩検定 UC級 合格" },
  { term: "2025年4月", title: "応用情報技術者試験 合格" },
  { term: "2025年3月", title: "普通自動車第一種運転免許 取得" },
  { term: "2022年4月", title: "基本情報技術者試験 合格" },
];
</script>

<template>
  <div class="certifications">
    <h2 v-colorful-heading class="category-title" lang="en">Certifications</h2>
    <div class="certification-list">
      <div v-for="item in certifications" :key="item.title" class="certification-item">
        <span class="item-term">{{ item.term }}</span>
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
