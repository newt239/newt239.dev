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
    <div class="musics">
      <div v-for="track in trackList?.slice(0, 12)" :key="track.name" class="track">
        <NuxtImg loading="lazy" class="thumbnail" :src="track.thumbnail" :alt="`${track.name}のアルバムアート`" />
        <div class="detail">
          <div class="info">
            <a :href="track.link" target="_blank" class="name underline">
              {{ track.name }}
            </a>
            <div class="sub-info">
              <div class="artists">
                {{ track.artists.join(", ") }}
              </div>
              <div>
                Duration /
                {{ dayjs(track.duration).format("m:ss") }}
              </div>
              <div>Popularity / {{ track.popularity }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.musics {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  .track {
    display: flex;
    flex-grow: 1;
    align-items: flex-start;
    width: max(30%, 300px);
    gap: 0.5rem;
    border-radius: 1rem;
    transition: all 0.5s;

    .thumbnail {
      width: min(150px, 50%);
      flex-grow: 1;
      aspect-ratio: 1 / 1;
      border-radius: 1rem;
      user-select: none;
      pointer-events: none;
    }

    @media (hover: hover) {
      &:hover .preview-button {
        opacity: 1;
      }
    }

    @media (hover: none) {
      &:active .preview-button {
        opacity: 1;
      }
    }

    .track-preview {
      cursor: pointer;
    }

    .detail {
      width: min(150px, 50%);
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .info {
        max-height: 80%;
        overflow: hidden;

        .name {
          font-size: 1.2rem;
          line-height: 1.5rem;
          font-weight: 800;
          cursor: pointer;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }

        .sub-info {
          padding-top: 0.3rem;
          font-size: 0.7rem;
          line-height: 0.7rem;

          .artists {
            margin-bottom: 0.5rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
