<script setup lang="ts">
import { IconBrandTwitter, IconBrandGithub } from "@tabler/icons-vue";
import dayjs from "dayjs";

const age = dayjs().diff(dayjs("2005-11-02"), "year");

const profile: string[] = [
  `${age}さい`,
  "すきなもの: Webフロントエンド, UI/UX",
  "言語: TypeScript, Python, Go",
  "趣味: アニメ, ボカロ等",
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
      <a class="sns-card twitter-card" href="https://twitter.com/newt239" target="_blank" rel="noopener noreferrer">
        <div class="sns-name">Twitter</div>
        <div>@newt239</div>
        <IconBrandTwitter />
      </a>
      <a class="sns-card github-card" href="https://github.com/newt239" target="_blank" rel="noopener noreferrer">
        <div class="sns-name">GitHub</div>
        <div>@newt239</div>
        <IconBrandGithub />
      </a>
      <a class="sns-card zenn-card" href="https://zenn.dev/newt_st21" target="_blank" rel="noopener noreferrer">
        <div class="sns-name">Zenn</div>
        <div>@newt_st21</div>
        <img src="/zenn.png" alt="Zenn" class="sns-icon" >
      </a>
      <a class="sns-card qiita-card" href="https://qiita.com/newt239" target="_blank" rel="noopener noreferrer">
        <div class="sns-name">Qiita</div>
        <div>@newt239</div>
        <img src="/qiita.png" alt="Qiita" class="sns-icon" >
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
      color: rgb(var(--color-back));
      border-radius: 0.5rem;
      padding: 0.6rem 1rem;
      transition: all 0.2s;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      &:hover {
        text-decoration: none;
        scale: 1.05;
      }
    }
  }

  .sns-name {
    width: 100%;
    font-size: 0.5rem;
    opacity: 0.7;
  }

  .twitter-card {
    background-color: #1da1f2;
    color: rgb(var(--color-back));
  }

  .github-card {
    background-color: #0e0c0d;
    color: rgb(var(--color-back));
  }

  .zenn-card {
    background-color: #3ea8ff;
    color: rgb(var(--color-back));
  }

  .qiita-card {
    background-color: #55c500;
    color: rgb(var(--color-back));
  }

  .sns-icon {
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(1);
  }
}
</style>
