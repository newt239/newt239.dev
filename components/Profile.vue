<script setup lang="ts">
import { IconBrandGithub, IconBrandX, IconChevronRight } from "@tabler/icons-vue";
import dayjs from "dayjs";

const age = dayjs().diff(dayjs("2005-11-02"), "year");

const profile: string[] = [
  `${age}yo`,
  "すきなもの: Webフロントエンド, UI/UX",
  "言語: TypeScript",
  "趣味: アニメ, ボカロ, 旅行, カメラ",
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
        <IconChevronRight :size="16" aria-hidden="true" />
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
        <IconBrandX aria-hidden="true" />
      </a>
      <a
        class="sns-card"
        href="https://github.com/newt239"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="sns-name">GitHub</div>
        <div>@newt239</div>
        <IconBrandGithub aria-hidden="true" />
      </a>
      <a
        class="sns-card"
        href="https://zenn.dev/newt_st21"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="sns-name">Zenn</div>
        <div>@newt_st21</div>
        <img src="/zenn.png" alt="" aria-hidden="true" class="sns-icon" />
      </a>
      <a
        class="sns-card"
        href="https://qiita.com/newt239"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="sns-name">Qiita</div>
        <div>@newt239</div>
        <img src="/qiita.webp" alt="" aria-hidden="true" class="sns-icon" />
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

  @media screen and (max-width: 43.75rem) {
    flex-direction: column;
  }

  .top-card {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    width: 70%;
    /* 明るい装飾は文字の乗る左上を避け、右側へ寄せてコントラストを確保する */
    background-image: radial-gradient(
        ellipse 48% 80% at 96% 2%,
        rgb(var(--bg-accent) / 0.28) 0%,
        transparent 52%
      ),
      radial-gradient(
        ellipse 34% 60% at 84% 98%,
        rgb(var(--bg-warm) / 0.24) 0%,
        transparent 50%
      ),
      linear-gradient(
        135deg,
        rgb(var(--text)) 0%,
        rgb(var(--text-muted)) 50%,
        rgb(var(--text)) 100%
      );
    color: rgb(var(--bg));
    border-radius: var(--radius-md);
    transition: var(--transition);

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

    @media screen and (max-width: 43.75rem) {
      width: 100%;
    }
  }

  .card-content {
    margin: 3vh min(3vh, 5vw) 5rem;

    ul {
      line-height: var(--line-height-body);
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
    border: var(--border-width) solid rgb(var(--bg));
    border-radius: var(--radius-pill);
    cursor: pointer;
    transition: var(--transition);
    font-size: 0.9375rem;
    font-weight: 600;
    color: rgb(var(--bg));
  }

  .sns-links {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    width: 30%;
    font-size: 1rem;

    @media screen and (max-width: 43.75rem) {
      width: 100%;
      display: grid;
      gap: 0.75rem;
      grid-template-columns: repeat(auto-fit, minmax(min(12.5rem, 100%), 1fr));
    }

    .sns-card {
      color: rgb(var(--text));
      background: rgb(var(--surface));
      border: var(--border-width) solid transparent;
      border-radius: var(--radius-md);
      padding: 0.6rem 1rem;
      transition: var(--transition);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-weight: 800;

      @media (hover: hover) {
        &:hover {
          border-color: rgb(var(--text));
          text-decoration: none;
        }
      }

      @media (hover: none) {
        &:active {
          border-color: rgb(var(--text));
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
