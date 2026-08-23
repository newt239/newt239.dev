<script setup lang="ts">
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
    <div class="track-grid">
      <a
        v-for="track in trackList?.slice(0, 12)"
        :key="track.name"
        :href="track.link"
        target="_blank"
        rel="noopener noreferrer"
        class="track-card"
      >
        <NuxtImg loading="lazy" class="track-thumbnail" :src="track.thumbnail" alt="" />
        <div class="track-body">
          <h3 class="track-name">{{ track.name }}</h3>
          <p class="track-artists">{{ track.artists.join(", ") }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<style>
.my-top-track-list {
  .track-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--card-min-width), 1fr));
    gap: 1rem;
  }

  .track-card {
    display: flex;
    gap: 0.75rem;
    padding: 0.75rem;
    color: rgb(var(--text));
    text-decoration: none;
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
    display: -webkit-box;
    padding: 0;
    margin: 0;
    overflow: hidden;
    -webkit-line-clamp: 2;
    font-size: 1rem;
    font-weight: 800;
    line-height: var(--line-height-tight);
    overflow-wrap: anywhere;
    -webkit-box-orient: vertical;
  }

  .track-artists {
    display: -webkit-box;
    margin: 0;
    overflow: hidden;
    -webkit-line-clamp: 1;
    font-size: 0.75rem;
    line-height: var(--line-height-tight);
    color: rgb(var(--text-muted));
    overflow-wrap: anywhere;
    -webkit-box-orient: vertical;
  }
}
</style>
