<script setup lang="ts">
const works = await queryContent('/works').sort({ creation: -1 }).find();
const active = ref<string>("");

useHead({
  title: "作品一覧 - newt239.dev",
});
</script>

<template>
  <main>
    <div class="container work-list-page">
      <h2 class="category-name">Works</h2>
      <div class="card-grid">
        <NuxtLink v-for="work in works" :key="work._path" :to="`${work._path}`" class="card"
          :class="{ 'active-work': active === work._path }">
          <img class="card-thumbnail" :src="`images/${work.thumbnail}`" :alt="`${work.title}のサムネイル画像`"
            :style="`view-transition-name: ${work._path.split('/')[2]}-img;`">
          <div class="card-body">
            <h3 :style="`view-transition-name: ${work._path.split('/')[2]}-name;`">{{ work.title }}</h3>
            <p>
              {{ work.description }}
            </p>
          </div>
        </NuxtLink>
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

    .card {
      display: flex;
      flex-direction: column;
      color: rgb(var(--color-text));
      background-color: rgb(var(--color-back));
      border: 2px solid rgb(var(--color-text));
      border-radius: 0.5rem;
      transition: all 0.2s;

      @media (hover: hover) {
        &:hover {
          scale: 1.05;
        }
      }

      @media (hover: none) {
        &:active {
          scale: 1.05;
        }
      }

      .card-thumbnail {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: calc(0.5rem - 2px) calc(0.5rem - 2px) 0 0;
        -webkit-touch-callout: none;
        pointer-events: none;
      }

      .card-body {
        padding: 1rem;

        h3 {
          margin: 0;
          padding: 0;
          font-size: 1.5rem;
          line-height: 1.8rem;
          color: rgb(var(--color-text));
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        p {
          margin: 0;
          color: rgb(var(--color-text));
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }

      &.active-work {
        img {
          view-transition-name: work-thumbnail;
        }

        h3 {
          view-transition-name: work-name;
        }
      }
    }
  }
}
</style>
