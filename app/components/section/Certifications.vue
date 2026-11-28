<script setup lang="ts">
import { certifications } from "~/lib/certifications";

const sortedCertifications = certifications.toSorted((a, b) => b.date.localeCompare(a.date));
</script>

<template>
  <div class="certifications">
    <h2 v-reveal lang="en">Certifications</h2>
    <ul class="record-list">
      <li v-for="item in sortedCertifications" :key="item.title" v-reveal class="record-item">
        <time :datetime="item.date" class="record-term">{{ new Date(item.date).toLocaleDateString("ja-JP", { year: "numeric", month: "long", timeZone: "UTC" }) }}</time>
        <span class="record-title">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>
