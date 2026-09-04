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
    <div class="album-grid">
      <a
        v-for="album in albums"
        :key="album.slug"
        :href="album.url"
        target="_blank"
        rel="noopener noreferrer"
        class="album-card"
        :aria-label="`${album.title} ${album.period} - fernweh（外部サイト）`"
      >
        <img
          class="album-card-thumbnail"
          :src="album.thumbnail.src"
          :srcset="album.thumbnail.srcset"
          sizes="(min-width: 48rem) 25rem, 100vw"
          alt=""
          loading="lazy"
          decoding="async"
        >
        <div class="album-card-body">
          <h3>
            {{ album.title }}
            <IconExternalLink aria-hidden="true" />
          </h3>
          <p class="album-card-period">{{ album.period }}</p>
        </div>
      </a>
      <a
        href="https://fernweh.newt239.dev/"
        target="_blank"
        rel="noopener noreferrer"
        class="see-all-card see-all-albums"
        aria-label="fernweh ですべての写真を見る（外部サイト）"
      >
        <span>
          すべての写真を見る
          <IconExternalLink aria-hidden="true" />
        </span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.album-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--card-min-width), 1fr));
  gap: 1rem;
}

.album-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: rgb(var(--text));
  background: rgb(var(--surface));
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-md);
  transition: var(--transition);

  @media (hover: hover) {
    &:hover {
      border-color: rgb(var(--text));
    }
  }

  @media (hover: none) {
    &:active {
      border-color: rgb(var(--text));
    }
  }
}

.album-card .tabler-icon,
.see-all-albums .tabler-icon {
  width: var(--external-link-icon-size);
  height: var(--external-link-icon-size);
  margin-left: var(--external-link-icon-gap-heading);
  vertical-align: var(--external-link-icon-shift);
}

.album-card-thumbnail {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  pointer-events: none;
  object-fit: cover;
  background: rgb(var(--surface-hover));
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  -webkit-touch-callout: none;
}

.album-card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 1rem 1rem;

  h3 {
    width: auto;
    padding: 0;
    margin: 0;
    font-size: 1.25rem;
    font-weight: 800;
    line-height: var(--line-height-tight);
    color: rgb(var(--text));
    overflow-wrap: anywhere;
    text-box: normal;

    .tabler-icon {
      color: rgb(var(--text-muted));
    }
  }
}

.album-card-period {
  margin: 0;
  font-size: 1rem;
  line-height: var(--line-height-tight);
  color: rgb(var(--text-muted));
}
</style>
