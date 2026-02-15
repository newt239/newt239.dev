<script setup lang="ts">
import { IconBrandGithub, IconBrandX, IconChevronRight } from "@tabler/icons-vue";
import dayjs from "dayjs";

const age = dayjs().diff(dayjs("2005-11-02"), "year");

const profile: string[] = [
  `${age}yo`,
  "すきなもの: Webフロントエンド, UI/UX",
  "言語: TypeScript",
  "趣味: アニメ鑑賞, 旅行",
];
</script>

<template>
  <div class="profile">
    <NuxtLink to="/about" class="top-card">
      <div class="card-content">
        <h2 lang="en">Welcome✨</h2>
        <ul>
          <li v-for="item in profile" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="more-detail-button">
        わたしについて
        <IconChevronRight :size="16" aria-hidden />
      </div>
    </NuxtLink>
    <div class="sns-links">
      <a
        class="sns-card"
        href="https://x.com/newt239"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="sns-name">X</div>
        <div>@newt239</div>
        <IconBrandX aria-hidden />
      </a>
      <a
        class="sns-card"
        href="https://github.com/newt239"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="sns-name">GitHub</div>
        <div>@newt239</div>
        <IconBrandGithub aria-hidden />
      </a>
      <a
        class="sns-card"
        href="https://zenn.dev/newt_st21"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="sns-name">Zenn</div>
        <div>@newt_st21</div>
        <img src="/zenn.png" aria-hidden class="sns-icon" />
      </a>
      <a
        class="sns-card"
        href="https://qiita.com/newt239"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="sns-name">Qiita</div>
        <div>@newt239</div>
        <img src="/qiita.png" aria-hidden class="sns-icon" />
      </a>
    </div>
  </div>
</template>

<style>
.profile {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }

  .top-card {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    width: 70%;
    background-image: radial-gradient(
        ellipse at 10% 0%,
        rgb(var(--bg-accent) / 0.7) 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse at 80% 20%,
        rgb(var(--bg-warm) / 0.5) 0%,
        transparent 40%
      ),
      linear-gradient(
        135deg,
        rgb(var(--text)) 0%,
        rgb(var(--text-muted)) 50%,
        rgb(var(--text)) 100%
      );
    color: rgb(var(--bg));
    border-radius: 0.75rem;
    transition: all 0.2s;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    @media (hover: hover) {
      &:hover {
        .more-detail-button {
          background-color: rgb(var(--bg));
          color: rgb(var(--text));
        }
      }
    }

    @media (hover: none) {
      &:active {
        .more-detail-button {
          background-color: rgb(var(--bg));
          color: rgb(var(--text));
        }
      }
    }

    h2 {
      padding: 0 0 1rem;
    }

    @media screen and (max-width: 700px) {
      width: 100%;
    }
  }

  .card-content {
    margin: 3vh 3vh 5rem;

    ul {
      line-height: 1.5;
      margin: 0;
    }
  }

  .more-detail-button {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid rgb(var(--bg));
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9375rem;
    font-weight: 600;
    color: rgb(var(--bg));

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  .sns-links {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    width: 30%;
    font-size: 1rem;

    @media screen and (max-width: 700px) {
      width: 100%;
      display: grid;
      gap: 0.75rem;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    .sns-card {
      color: rgb(var(--text));
      background: rgb(0 0 0 / 0.035);
      border: none;
      border-radius: 0.75rem;
      padding: 0.6rem 1rem;
      transition: background 0.2s;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-weight: 800;

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }

      @media (hover: hover) {
        &:hover {
          background: rgb(0 0 0 / 0.08);
          text-decoration: none;
        }
      }

      @media (hover: none) {
        &:active {
          background: rgb(0 0 0 / 0.08);
        }
      }
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
