<script setup lang="ts">
import WorkItem from '~/components/WorkItem.vue';

const works = await queryCollection('works').order("order", "ASC").all();

useSeoMeta({
  title: "作品一覧 - newt239.dev",
  ogTitle: "作品一覧 - newt239.dev",
});
</script>

<template>
  <main>
    <div class="container work-list-page">
      <h2 class="category-name">Works</h2>
      <div class="card-grid">
        <WorkItem v-for="work in works" :key="work.id" :work="work" />
      </div>
    </div>
  </main>
</template>

<style>
.work-list-page {
  .category-name {
    view-transition-name: work-category-name;
  }

  .card-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

    a {
      color: rgb(var(--color-text));
      text-decoration: none;
    }
  }
}
</style>
