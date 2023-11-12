<script setup lang="ts">
import dayjs from "dayjs";

import {
  IconInfoSquareRounded,
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from "@tabler/icons-vue";

type TrackListProp = {
  name: string;
  artists: string[];
  thumbnail: string;
  preview: string | null;
  duration: number;
  popularity: number;
  link: string;
};

type AudioStateProp = {
  state: boolean;
  source: string;
  music: HTMLAudioElement | null;
};

const { data: trackList } = await useFetch<TrackListProp[]>(
  "https://api.newt239.dev/spotify/my-top-tracks"
);

const audioState = ref<AudioStateProp>({
  state: false,
  source: "",
  music: null,
});

const audioButton = (src: string | null) => {
  if (process.client) {
    if (src) {
      const normalPlayAction = () => {
        audioState.value.music = new Audio(src);
        audioState.value.music.play();
        audioState.value.state = true;
        audioState.value.source = src;
      };
      if (!audioState.value.music) {
        normalPlayAction();
      } else {
        audioState.value.music.pause();
        if (!audioState.value.state) {
          if (audioState.value.source !== src) {
            normalPlayAction();
          } else {
            audioState.value.music.play();
            audioState.value.state = true;
          }
        } else if (audioState.value.source !== src) {
          normalPlayAction();
        } else {
          audioState.value.state = false;
        }
      }
    }
  }
};
</script>

<template>
  <div v-show="trackList && trackList.length !== 0" class="myTopTrackList">
    <h2>My Top Tracks</h2>
    <div class="alert info">
      <IconInfoSquareRounded />
      <div>再生ボタンをタップすると楽曲のプレビューを再生できます。</div>
    </div>
    <div class="musics">
      <div
        v-for="track in trackList?.slice(0, 12)"
        :key="track.name"
        class="track"
      >
        <NuxtImg
          placeholder
          loading="lazy"
          class="thumbnail"
          :class="track.preview ? 'trackPreview' : ''"
          :src="track.thumbnail"
          :alt="`${track.name}のアルバムアート`"
        />
        <div class="detail">
          <div class="info">
            <a :href="track.link" target="_blank" class="name">{{
              track.name
            }}</a>
            <div class="subInfo">
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
          <div class="preview">
            <button
              v-if="track.preview"
              class="previewButton"
              @click="audioButton(track.preview ? track.preview : null)"
            >
              <IconPlayerPlayFilled
                v-if="
                  !audioState.state ||
                  (audioState.state && audioState.source !== track.preview)
                "
                aria-hidden="true"
              />
              <IconPlayerPauseFilled v-else aria-hidden="true" />
              <span
                v-if="
                  !audioState.state ||
                  (audioState.state && audioState.source !== track.preview)
                "
                >再生</span
              >
              <span v-else>停止</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.musics {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  .track {
    display: flex;
    flex-grow: 1;
    align-items: flex-start;
    width: max(30%, 300px);
    gap: 1rem;
    border-radius: 1rem;
    transition: all 0.5s;

    .thumbnail {
      width: min(150px, 50%);
      flex-grow: 1;
      aspect-ratio: 1 / 1;
      border-radius: 1rem;
      filter: drop-shadow(2px 4px 6px black);
      -webkit-touch-callout: none;
      pointer-events: none;
    }

    @media (hover: hover) {
      &:hover .previewButton {
        opacity: 1;
      }
    }
    @media (hover: none) {
      &:active .previewButton {
        opacity: 1;
      }
    }

    .trackPreview {
      cursor: pointer;
    }

    .detail {
      width: min(150px, 50%);
      aspect-ratio: 1 / 1;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .info {
        max-height: 80%;
        overflow: hidden;

        .name {
          font-size: 1.2rem;
          line-height: 1rem;
          font-weight: 800;
          cursor: pointer;
        }

        .subInfo {
          padding-top: 0.3rem;
          font-size: 0.7rem;
          line-height: 0.7rem;

          .artists {
            margin-bottom: 0.5rem;
          }
        }
      }
    }

    .previewButton {
      display: flex;
      font-weight: 800;
      padding: 0.1rem 0.8rem;
      gap: 0.3rem;
      border: 1px $color-white solid;
      border-radius: 1rem;
      background-color: transparent;
      cursor: pointer;
      transition: all 0.2s;

      @media (hover: hover) {
        &:hover {
          background-color: $color-black-secondary;
        }
      }
      @media (hover: none) {
        &:active {
          background-color: $color-black-secondary;
        }
      }

      .icon-tabler {
        vertical-align: 0px;
      }
    }
  }
}
</style>
