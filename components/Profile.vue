<script setup lang="ts">
import { IconBrandGithub, IconBrandX } from "@tabler/icons-vue";
import dayjs from "dayjs";

const age = dayjs().diff(dayjs("2005-11-02"), "year");

const profile: string[] = [
  `${age}さい`,
  "すきなもの: Webフロントエンド, UI/UX",
  "言語: TypeScript",
  "趣味: アニメ鑑賞, 旅行",
];
</script>

<template>
  <div class="profile">
    <NuxtLink to="/about" class="top-card">
      <div class="card-content">
        <h2>Welcome✨</h2>
        <ul>
          <li v-for="item in profile" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="more-detail-button">もっとくわしく！</div>
    </NuxtLink>
    <div class="sns-links">
      <a class="sns-card x-card" href="https://x.com/newt239" target="_blank" rel="noopener noreferrer">
        <div class="sns-name">X</div>
        <div>@newt239</div>
        <IconBrandX />
      </a>
      <a class="sns-card github-card" href="https://github.com/newt239" target="_blank" rel="noopener noreferrer">
        <div class="sns-name">GitHub</div>
        <div>@newt239</div>
        <IconBrandGithub />
      </a>
      <a class="sns-card zenn-card" href="https://zenn.dev/newt_st21" target="_blank" rel="noopener noreferrer">
        <div class="sns-name">Zenn</div>
        <div>@newt_st21</div>
        <img src="/zenn.png" alt="Zenn" class="sns-icon">
      </a>
      <a class="sns-card qiita-card" href="https://qiita.com/newt239" target="_blank" rel="noopener noreferrer">
        <div class="sns-name">Qiita</div>
        <div>@newt239</div>
        <img src="/qiita.png" alt="Qiita" class="sns-icon">
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
  gap: 2rem;
  color: white;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }

  .top-card {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    width: 70%;
    background-image: linear-gradient(135deg,
        rgb(var(--color-back-secondary)) 0%,
        rgb(var(--color-text)) 100%);
    color: rgb(var(--color-back));
    border-radius: 0.5rem;
    transition: all 0.2s;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    @media (hover: hover) {
      &:hover {
        scale: 1.03;

        .more-detail-button {
          background-color: rgb(var(--color-back));
          color: rgb(var(--color-text));
        }
      }
    }

    @media (hover: none) {
      &:active {
        scale: 1.03;

        .more-detail-button {
          background-color: rgb(var(--color-back));
          color: rgb(var(--color-text));
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
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    width: 10rem;
    height: 3rem;
    border: 1px solid rgb(var(--color-back));
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.2s;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    color: rgb(var(--color-back));

    &:hover {
      text-decoration: none;
    }
  }

  .sns-links {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5rem;
    width: 30%;
    font-size: 1rem;

    @media screen and (max-width: 700px) {
      width: 100%;
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    a {
      color: rgb(var(--color-text));
      border: 2px solid rgb(var(--color-text));
      border-radius: 0.5rem;
      padding: 0.6rem 1rem;
      transition: all 0.2s;

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-weight: 800;

      &:hover {
        text-decoration: none;
        scale: 1.05;
      }
    }
  }

  .sns-name {
    width: 100%;
    font-size: 0.5rem;
    font-weight: 400;
  }

  .sns-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
