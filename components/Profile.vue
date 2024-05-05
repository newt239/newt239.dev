<script setup lang="ts">
import { IconBrandTwitter, IconBrandGithub } from "@tabler/icons-vue";
import dayjs from "dayjs";

const age = dayjs().diff(dayjs("2005-11-02"), "year");

const profile: string[] = [
  `${age}さい`,
  "すきなもの: Webフロントエンド, UI / UX, アクセシビリティ",
  "言語: TypeScript, Python, Go",
  "趣味: アニメ, ボカロ等",
];
</script>

<template>
  <div class="profile">
    <NuxtLink to="/about" class="topCard">
      <div class="cardContent">
        <h2>Welcome✨</h2>
        <ul>
          <li v-for="item in profile" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="moreDetailButton">もっとくわしく！</div>
    </NuxtLink>
    <div class="snsLinks">
      <a class="snsCard twitterCard" href="https://twitter.com/newt239" target="_blank" rel="noopener noreferrer">
        <div class="snsName">Twitter</div>
        <div>@newt239</div>
        <IconBrandTwitter />
      </a>
      <a class="snsCard githubCard" href="https://github.com/newt239" target="_blank" rel="noopener noreferrer">
        <div class="snsName">GitHub</div>
        <div>@newt239</div>
        <IconBrandGithub />
      </a>
      <a class="snsCard zennCard" href="https://zenn.dev/newt_st21" target="_blank" rel="noopener noreferrer">
        <div class="snsName">Zenn</div>
        <div>@newt_st21</div>
        <img src="/zenn.png" alt="Zenn" class="snsIcon" />
      </a>
      <a class="snsCard qiitaCard" href="https://qiita.com/newt239" target="_blank" rel="noopener noreferrer">
        <div class="snsName">Qiita</div>
        <div>@newt239</div>
        <img src="/qiita.png" alt="Qiita" class="snsIcon" />
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

  .topCard {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    width: 70%;
    background-image: linear-gradient(to bottom right,
        oklch(80% 0.4 222),
        oklch(35% 0.5 313));
    border: 2px solid rgb(var(--color-back-secondary));
    color: white;
    border-radius: 0.5rem;
    filter: drop-shadow(2px 4px 6px black);

    @media (hover: hover) {
      &:hover {
        filter: none;

        .moreDetailButton {
          background-color: white;
          color: black;
        }
      }
    }

    @media (hover: none) {
      &:active {
        filter: none;

        .moreDetailButton {
          background-color: white;
          color: black;
        }
      }
    }

    h2 {
      padding: 0 0 1rem;
    }

    @media screen and (max-width: 700px) {
      width: 100%;
      background-image: linear-gradient(0deg,
          rgb(69 69 214) 0%,
          rgb(0 212 255) 100%);
    }
  }

  .cardContent {
    margin: 3vh 3vh 5rem;

    ul {
      line-height: 1.5;
      margin: 0;
    }
  }

  .moreDetailButton {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    width: 10rem;
    height: 3rem;
    border: 1px solid white;
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    color: white;

    &:hover {
      text-decoration: none;
    }
  }

  .snsLinks {
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
      color: white;
      border-radius: 0.5rem;
      padding: 0.6rem 1rem;
      filter: drop-shadow(2px 4px 6px black);
      transition: all 0.2s;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      &:hover {
        text-decoration: none;
        filter: none;
      }
    }
  }

  .snsName {
    width: 100%;
    font-size: 0.5rem;
    opacity: 0.7;
  }

  .snsCard {
    border: 2px solid rgb(var(--color-back-secondary));
  }

  .twitterCard {
    background-color: #1da1f2;
    color: white;
  }

  .githubCard {
    background-color: #0e0c0d;
    color: white;
  }

  .zennCard {
    background-color: #3ea8ff;
    color: white;
  }

  .qiitaCard {
    background-color: #55c500;
    color: white;
  }

  .snsIcon {
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(1);
  }
}
</style>
