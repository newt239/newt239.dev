<script setup lang="ts">
import { IconExternalLink } from "@tabler/icons-vue";

type AlbumListResponse = {
  albums: {
    period: string;
    slug: string;
    thumbnail: { src: string; srcset: string };
    title: string;
    url: string;
  }[];
};

const { data, error } = await useAsyncData("fernweh-albums", () =>
  $fetch<AlbumListResponse>("https://fernweh.newt239.dev/api/albums.json", {
    timeout: 5000,
    retry: 1,
  })
);

if (import.meta.server && error.value) {
  console.warn("fernweh のアルバム一覧を取得できませんでした", error.value);
}

const albums = computed(() => data.value?.albums.slice(0, 5) ?? []);
</script>

<template>
  <div class="latest-album-list">
    <h2 v-colorful-heading lang="en">Photos</h2>
    <div class="card-grid">
      <a
        v-for="album in albums"
        :key="album.slug"
        :href="album.url"
        target="_blank"
        rel="noopener noreferrer"
        class="thumb-card surface-card"
        :aria-label="`${album.title} ${album.period} - fernweh（外部サイト）`"
      >
        <img
          class="thumb-card-image"
          :src="album.thumbnail.src"
          :srcset="album.thumbnail.srcset"
          sizes="(min-width: 48rem) 25rem, 100vw"
          alt=""
          loading="lazy"
          decoding="async"
        >
        <div class="thumb-card-body">
          <h3 class="thumb-card-title">
            {{ album.title }}
            <IconExternalLink class="external-icon" aria-hidden="true" />
          </h3>
          <p class="thumb-card-text">{{ album.period }}</p>
        </div>
      </a>
      <a
        href="https://fernweh.newt239.dev/"
        target="_blank"
        rel="noopener noreferrer"
        class="see-all-card surface-card"
        aria-label="fernweh ですべての写真を見る（外部サイト）"
      >
        <span>
          すべての写真を見る
          <IconExternalLink class="external-icon" aria-hidden="true" />
        </span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.thumb-card-image {
  background: rgb(var(--surface-hover));
}

.thumb-card-title .external-icon {
  margin-left: var(--external-link-icon-gap-heading);
  color: rgb(var(--text-muted));
}
</style>
