<script setup lang="ts">
export type WorkItemProps = {
  work: {
    path: string;
    title: string;
    thumbnail: string;
    description: string;
  };
};
const props = defineProps<WorkItemProps>();
</script>

<template>
  <NuxtLink :to="`/works/${props.work.path.split('/')[2]}`" class="card">
    <img class="card-thumbnail" :src="`images/${props.work.thumbnail}`" :alt="`${props.work.title}のサムネイル画像`"
      :style="`view-transition-name: ${props.work.path.split('/')[2]}-img;`">
    <div class="card-body">
      <h3 :style="`view-transition-name: ${props.work.path.split('/')[2]}-name;`">{{ props.work.title }}</h3>
      <p>
        {{ props.work.description }}
      </p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  color: rgb(var(--color-text));
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
    padding: 0.5rem 1rem 1rem 1rem;

    h3 {
      margin: 0;
      padding: 0;
      font-size: 1.5rem;
      line-height: 2.3rem;
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
}
</style>
