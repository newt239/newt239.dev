<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import moment from "moment";

type TrackListProp = {
  name: string;
  artists: string[];
  thumbnail: string;
  preview: string | null;
  duration: number;
  popularity: number;
  link: string;
}[];

type AudioStateProp = {
  state: boolean;
  source: string;
  music: HTMLAudioElement | null;
};

const { data: trackList }: { data: TrackListProp } = await axios.get(
  "/api/spotify"
);

const audioState = ref<AudioStateProp>({
  state: false,
  source: "",
  music: null,
});
const audioButton = (src: string | null) => {
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
        if (audioState.value.source != src) {
          normalPlayAction();
        } else {
          audioState.value.music.play();
          audioState.value.state = true;
        }
      } else if (audioState.value.source != src) {
        normalPlayAction();
      } else {
        audioState.value.state = false;
      }
    }
  }
};
</script>

<template>
  <div class="intro">
    <div v-if="!trackList">Loading...</div>
    <div v-else>* Tap album art to play</div>
  </div>
  <div class="myTopTracks">
    <div
      v-for="track in trackList?.slice(0, 12)"
      :key="track.name"
      class="track"
      :alt="track.name"
    >
      <div
        class="thumbnailWrapper"
        @click="audioButton(track.preview ? track.preview : null)"
      >
        <img
          :src="track.thumbnail"
          class="trackThumbnail"
          :class="track.preview ? 'trackPreview' : ''"
        />
        <div class="thumbnailCaption">
          {{
            track.preview
              ? audioState.state
                ? audioState.source == track.preview
                  ? "PAUSE"
                  : "PLAY"
                : "PLAY"
              : ""
          }}
        </div>
      </div>
      <div class="trackInfo">
        <a :href="track.link" target="_blank" class="trackName">{{
          track.name
        }}</a>
        <div class="trackArtists">
          {{ track.artists.join(", ") }}
        </div>
        <div class="subInfo">
          <div>
            Duration /
            {{ moment(track.duration).format("m:ss") }}
          </div>
          <div>Popularity / {{ track.popularity }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.intro {
  padding: 1rem;
}

.myTopTracks {
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

    .thumbnailWrapper {
      position: relative;
      width: min(150px, 50%);
      flex-grow: 1;

      .trackThumbnail {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 1rem;
        filter: drop-shadow(2px 4px 6px black);
      }

      .thumbnailCaption {
        font-size: 2rem;
        font-weight: 800;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        mix-blend-mode: difference;
        opacity: 0;
        transition: all 0.5s;
        cursor: pointer;
      }

      &:hover .thumbnailCaption {
        opacity: 1;
      }
    }

    .trackPreview {
      cursor: pointer;
    }

    .trackInfo {
      width: min(150px, 50%);
      flex-grow: 1;
    }

    .trackName {
      font-size: 1.2rem;
      line-height: 1rem;
      font-weight: 800;
      cursor: pointer;
    }

    .subInfo {
      padding-top: 0.3rem;
      font-size: 0.7rem;
      line-height: 0.7rem;
    }
  }

  @include mq(mobile) {
    flex-direction: column;
  }
}
</style>
