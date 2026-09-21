<script setup lang="ts">
import { IconBrandGithub, IconBrandX, IconChevronRight } from "@tabler/icons-vue";

import { socialLinks } from "~/libs/links";
import { person } from "~/libs/person";

const today = new Date();
const age =
  today.getUTCFullYear() -
  new Date(person.birthDate).getUTCFullYear() -
  (today.toISOString().slice(5, 10) < person.birthDate.slice(5) ? 1 : 0);

const profile: { text: string; lang?: string }[] = [
  { text: `${age}yo`, lang: "en" },
  { text: "すきなもの: Webフロントエンド, UI/UX" },
  { text: "言語: TypeScript" },
  { text: "趣味: アニメ, ボカロ, 旅行, カメラ" },
];

const snsLinks = [
  { ...socialLinks.x, icon: IconBrandX },
  { ...socialLinks.github, icon: IconBrandGithub },
  { ...socialLinks.zenn, icon: "/zenn.png" },
  { ...socialLinks.qiita, icon: "/qiita.webp" },
];
</script>

<template>
  <div class="profile">
    <NuxtLink to="/about" class="top-card">
      <div class="card-content">
        <h2 lang="en">Welcome✨</h2>
        <ul>
          <li v-for="item in profile" :key="item.text" :lang="item.lang">
            {{ item.text }}
          </li>
        </ul>
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
        <component :is="link.icon" v-if="typeof link.icon !== 'string'" aria-hidden="true" />
        <NuxtImg v-else :src="link.icon" alt="" aria-hidden="true" width="24" height="24" class="sns-icon" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;

  @media screen and (width <= 43.75rem) {
    flex-direction: column;
  }

  .top-card {
    --top-card-blob: var(--text-muted);

    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    width: 70%;
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
    transition: var(--transition);

    @media (prefers-color-scheme: dark) {
      --top-card-blob: var(--bg);

      color: oklch(var(--text));
      background-color: oklch(var(--surface));
      border: var(--border-width) solid oklch(var(--border));
    }

    @media (hover: hover) {
      &:hover {
        .more-detail-button {
          color: oklch(var(--text));
          background-color: oklch(var(--bg));

          @media (prefers-color-scheme: dark) {
            color: oklch(var(--surface));
            background-color: oklch(var(--text));
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
            color: oklch(var(--surface));
            background-color: oklch(var(--text));
          }
        }
      }
    }

    h2 {
      padding: 0 0 1rem;
    }

    @media screen and (width <= 43.75rem) {
      width: 100%;
    }
  }

  .card-content {
    margin: 3vh min(3vh, 5vw) 5rem;

    ul {
      margin: 0;
      line-height: var(--line-height-body);
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
  }

  .sns-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    width: 30%;
    font-size: 1rem;

    @media screen and (width <= 43.75rem) {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(12.5rem, 100%), 1fr));
      gap: 0.75rem;
      width: 100%;
    }

    .sns-card {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      font-weight: 800;
    }
  }

  .sns-name {
    width: 100%;
    font-size: 0.75rem;
    font-weight: 400;
  }

  .sns-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
