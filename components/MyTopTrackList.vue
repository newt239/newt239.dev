<script setup lang="ts">
import { IconExternalLink } from "@tabler/icons-vue";

type TrackListProp = {
  name: string;
  artists: string[];
  thumbnail: string;
  preview: string | null;
  duration: number;
  link: string;
};

const { data: trackList } = useLazyFetch<TrackListProp[]>(
  "https://api.newt239.dev/spotify/my-top-tracks"
);
</script>

<template>
  <div v-show="trackList && trackList.length !== 0" class="my-top-track-list">
    <h2 v-colorful-heading lang="en">My Top Tracks</h2>
    <div class="card-grid">
      <a
        v-for="track in trackList?.slice(0, 12)"
        :key="track.name"
        :href="track.link"
        target="_blank"
        rel="noopener noreferrer"
        class="track-card surface-card"
        :aria-label="`${track.name} ${track.artists.join(', ')} - Spotify（外部サイト）`"
      >
        <NuxtImg loading="lazy" class="track-thumbnail" :src="track.thumbnail" alt="" />
        <div class="track-body">
          <h3 class="track-name line-clamp">
            {{ track.name }}
            <IconExternalLink class="external-icon" aria-hidden="true" />
          </h3>
          <p class="track-artists line-clamp">{{ track.artists.join(", ") }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.track-card {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
}

.track-thumbnail {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  pointer-events: none;
  user-select: none;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.track-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 0;
}

.track-name {
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  line-height: var(--line-height-tight);
  overflow-wrap: anywhere;

  .external-icon {
    margin-left: var(--external-link-icon-gap-heading);
    color: rgb(var(--text-muted));
  }
}

.track-artists {
  --line-clamp: 1;

  margin: 0;
  font-size: 0.75rem;
  line-height: var(--line-height-tight);
  color: rgb(var(--text-muted));
  overflow-wrap: anywhere;
}
</style>
