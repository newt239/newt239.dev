<script setup lang="ts">
import dayjs from "dayjs";

type TrackListProp = {
  name: string;
  artists: string[];
  thumbnail: string;
  preview: string | null;
  duration: number;
  popularity: number;
  link: string;
};

const { data: trackList } = await useFetch<TrackListProp[]>(
  "https://api.newt239.dev/spotify/my-top-tracks"
);
</script>

<template>
  <div v-show="trackList && trackList.length !== 0" class="my-top-track-list">
    <h2>My Top Tracks</h2>
    <div class="track-grid">
      <a
        v-for="track in trackList?.slice(0, 12)"
        :key="track.name"
        :href="track.link"
        target="_blank"
        rel="noopener noreferrer"
        class="track-card"
      >
        <NuxtImg loading="lazy" class="track-thumbnail" :src="track.thumbnail" :alt="`${track.name}のアルバムアート`" />
        <div class="track-body">
          <h4 class="track-name">{{ track.name }}</h4>
          <p class="track-artists">{{ track.artists.join(", ") }}</p>
          <div class="track-meta">
            <span>{{ dayjs(track.duration).format("m:ss") }}</span>
            <span>Popularity {{ track.popularity }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style>
.my-top-track-list {
  .track-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .track-card {
    display: flex;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 0.75rem;
    background: rgb(var(--surface));
    color: rgb(var(--text));
    text-decoration: none;
    transition: background 0.2s;

    @media (hover: hover) {
      &:hover {
        background: rgb(var(--surface-hover));
      }
    }

    @media (hover: none) {
      &:active {
        background: rgb(var(--surface-hover));
      }
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  .track-thumbnail {
    width: 80px;
    height: 80px;
    border-radius: 0.5rem;
    object-fit: cover;
    flex-shrink: 0;
    user-select: none;
    pointer-events: none;
  }

  .track-body {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
    justify-content: center;
  }

  .track-name {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .track-artists {
    margin: 0;
    font-size: 0.875rem;
    color: rgb(var(--text-muted));
    line-height: 1.4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .track-meta {
    display: flex;
    gap: 0.75rem;
    font-size: 0.8125rem;
    color: rgb(var(--text-faint));
    line-height: 1.4;
  }
}
</style>
