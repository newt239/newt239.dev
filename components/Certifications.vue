<script setup lang="ts">
import { certifications } from "~/libs/certifications";

const sortedCertifications = certifications.toSorted((a, b) => b.date.localeCompare(a.date));
</script>

<template>
  <div class="certifications">
    <h2 v-colorful-heading lang="en">Certifications</h2>
    <div class="certification-list record-list">
      <div v-for="item in sortedCertifications" :key="item.title" class="record-item">
        <time :datetime="item.date" class="record-term">{{ item.date.slice(0, 4) }}年{{ Number(item.date.slice(5)) }}月</time>
        <span class="record-title">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.certification-list {
  --record-term-width: min(6rem, 40%);
}
</style>
