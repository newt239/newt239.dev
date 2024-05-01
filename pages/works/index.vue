<script setup lang="ts">
const works = await queryContent('/works').sort({ creation: -1 }).find();
const active = ref<string>("");

useHead({
  title: "作品一覧 - newt239.dev",
});
</script>

<template>
  <main>
    <div class="container workListPage">
      <h2 class="categoryName">Works</h2>
      <div class="cardGrid">
        <NuxtLink v-for="work in works" :key="work._path" :to="`${work._path}`" class="card"
          :class="{ 'active-work': active === work._path }" @click="active = work._path!">
          <img class="cardThumbnail" :src="`images/${work.thumbnail}`" :alt="`${work.title}のサムネイル画像`">
          <div class="cardBody">
            <h3>{{ work.title }}</h3>
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
.workListPage {
  .categoryName {
    view-transition-name: work-category-name;
  }

  .cardGrid {
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
      background-color: rgb(var(--color-black-secondary));
      border-radius: 0.5rem;
      filter: drop-shadow(2px 4px 6px black);
      transition: all 0.2s;

      @media (hover: hover) {
        &:hover {
          filter: none;
        }
      }

      @media (hover: none) {
        &:active {
          filter: none;
        }
      }

      .cardThumbnail {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: 0.5rem 0.5rem 0 0;
        -webkit-touch-callout: none;
        pointer-events: none;
      }

      .cardBody {
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
