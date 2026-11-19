<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";

import { socialLinks } from "~/libs/links";
import { bioLines } from "~/libs/person";

const snsLinks = [
  { ...socialLinks.x, icon: "/x.svg", iconOnDark: "/x-white.svg" },
  { ...socialLinks.github, icon: "/github.svg", iconOnDark: "/github-white.svg" },
  { ...socialLinks.zenn, icon: "/zenn.png", iconOnDark: undefined },
  { ...socialLinks.qiita, icon: "/qiita.webp", iconOnDark: undefined },
];
</script>

<template>
  <div class="profile">
    <NuxtLink to="/about" class="top-card">
      <div class="card-content">
        <h2 lang="en">Welcome✨</h2>
        <p>
          <template v-for="([lead, phrase], index) in bioLines" :key="lead">
            <br v-if="index > 0">{{ lead }}<span v-if="phrase" class="phrase">{{ phrase }}</span>
          </template>
        </p>
      </div>
      <div class="more-detail-button">
        わたしについて
        <IconChevronRight :size="16" aria-hidden="true" />
      </div>
    </NuxtLink>
    <div class="sns-links">
      <a
        v-for="link in snsLinks"
        :key="link.href"
        class="sns-card surface-card"
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="sns-name">{{ link.name }}</div>
        <div>{{ link.handle }}</div>
        <template v-if="link.iconOnDark">
          <img :src="link.icon" alt="" width="48" height="48" class="sns-icon logo-light">
          <img :src="link.iconOnDark" alt="" width="48" height="48" class="sns-icon logo-dark">
        </template>
        <NuxtImg v-else :src="link.icon" alt="" width="48" height="48" class="sns-icon" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.profile {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--card-min-width), 1fr));
  gap: var(--grid-gap);
  container-type: inline-size;

  .top-card {
    --top-card-blob: var(--text-muted);

    position: relative;
    display: flex;
    flex-direction: column;
    grid-column: 1 / -2;
    gap: 1rem;
    justify-content: space-between;
    color: oklch(var(--bg));
    background-color: oklch(var(--text));
    background-image: radial-gradient(
        ellipse 90% 125% at 88% 6%,
        oklch(var(--top-card-blob) / 95%) 0%,
        oklch(var(--top-card-blob) / 60%) 28%,
        oklch(var(--top-card-blob) / 25%) 52%,
        oklch(var(--top-card-blob) / 7%) 68%,
        oklch(var(--top-card-blob) / 0%) 82%
      ),
      radial-gradient(
        ellipse 75% 105% at 6% 98%,
        oklch(var(--top-card-blob) / 60%) 0%,
        oklch(var(--top-card-blob) / 30%) 34%,
        oklch(var(--top-card-blob) / 8%) 58%,
        oklch(var(--top-card-blob) / 0%) 76%
      ),
      radial-gradient(
        ellipse 65% 85% at 52% 44%,
        oklch(var(--top-card-blob) / 32%) 0%,
        oklch(var(--top-card-blob) / 12%) 45%,
        oklch(var(--top-card-blob) / 0%) 74%
      );
    border-radius: var(--radius-md);
    isolation: isolate;
    transition: var(--transition);

    &::before {
      position: absolute;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      content: "";
      background-image: radial-gradient(circle, currentcolor 1px, transparent 1.5px);
      background-size: 14px 14px;
      border-radius: inherit;
      opacity: 0.28;
      mask-image: radial-gradient(ellipse 85% 110% at 100% 0%, #000 0%, transparent 75%);

      @media (forced-colors: active) {
        display: none;
      }

      @media print {
        display: none;
      }
    }

    @media (prefers-color-scheme: dark) {
      --top-card-blob: var(--bg);

      color: oklch(var(--text));
      background-color: oklch(var(--surface-hover));
    }

    @media (prefers-contrast: more) {
      border: max(var(--border-width), 2px) solid oklch(var(--text-muted));
    }

    @media (forced-colors: active) {
      color: CanvasText;
      background-color: Canvas;
      background-image: none;
      border: max(var(--border-width), 2px) solid CanvasText;
    }

    @media print {
      color: oklch(var(--text));
      background-color: transparent;
      background-image: none;
      border: var(--border-width-hairline) solid oklch(var(--border));
    }

    @media (hover: hover) {
      &:hover {
        .more-detail-button {
          color: oklch(var(--text));
          background-color: oklch(var(--bg));

          @media (prefers-color-scheme: dark) {
            color: oklch(var(--surface-hover));
            background-color: oklch(var(--text));
          }

          @media (forced-colors: active) {
            outline: max(var(--border-width), 2px) solid Highlight;
            outline-offset: var(--focus-ring-offset);
          }
        }
      }
    }

    @media (hover: none) {
      &:active {
        .more-detail-button {
          color: oklch(var(--text));
          background-color: oklch(var(--bg));

          @media (prefers-color-scheme: dark) {
            color: oklch(var(--surface-hover));
            background-color: oklch(var(--text));
          }
        }
      }
    }

    h2 {
      padding: 0 0 1.5rem;

      @container (width < 37rem) {
        padding-bottom: 1rem;
      }
    }
  }

  .card-content {
    margin: 3vh min(3vh, 5vw) 5rem;

    p {
      margin: 0;
      line-height: var(--line-height-loose);
      text-wrap: pretty;
    }

    .phrase {
      display: inline-block;
    }
  }

  .more-detail-button {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    display: inline-flex;
    gap: 0.25rem;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 800;
    color: oklch(var(--bg));
    cursor: pointer;
    border: var(--border-width) solid oklch(var(--bg));
    border-radius: var(--radius-pill);
    transition: var(--transition);

    @media (prefers-color-scheme: dark) {
      color: oklch(var(--text));
      border-color: oklch(var(--text));
    }

    @media print {
      display: none;
    }
  }

  .sns-links {
    display: flex;
    flex-direction: column;
    gap: var(--grid-gap);
    justify-content: space-between;
    font-size: 1rem;

    @container (width < 37rem) {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(12.5rem, 100%), 1fr));
    }

    .sns-card {
      display: grid;
      grid-template-columns: 1fr auto;
      column-gap: 0.75rem;
      align-items: center;
      padding: 0.5rem 1rem;
      font-weight: 800;

      @media print {
        &::after {
          grid-column: 1 / -1;
        }
      }
    }
  }

  .sns-name {
    font-size: 0.75rem;
    font-weight: 400;
  }

  .sns-icon {
    grid-row: 1 / span 2;
    grid-column: 2;
    width: 2rem;
    height: 2rem;
    object-fit: contain;
  }
}
</style>
