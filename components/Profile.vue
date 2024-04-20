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
    <div class="top-card">
      <div class="card-content">
        <h2>Welcome✨</h2>
        <ul>
          <li v-for="item in profile" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="card-bottom">
        <NuxtLink to="/about" class="more-detail-button">もっとくわしく！</NuxtLink>
      </div>
    </div>
    <div class="sns-links">
      <a class="sns-twitter" href="https://twitter.com/newt239" target="_blank" rel="noopener noreferrer">
        <div class="sns-name">Twitter</div>
        <div>@newt239</div>
        <IconBrandTwitter />
      </a>
      <a class="sns-github" href="https://github.com/newt239" target="_blank" rel="noopener noreferrer">
        <div class="sns-name">GitHub</div>
        <div>@newt239</div>
        <IconBrandGithub />
      </a>
      <a class="sns-zenn" href="https://zenn.dev/newt_st21" target="_blank" rel="noopener noreferrer">
        <div class="sns-name">Zenn</div>
        <div>@newt_st21</div>
        <img src="/zenn.png" alt="Zenn" class="sns-icon" />
      </a>
      <a class="sns-qiita" href="https://qiita.com/newt239" target="_blank" rel="noopener noreferrer">
        <div class="sns-name">Qiita</div>
        <div>@newt239</div>
        <img src="/qiita.png" alt="Qiita" class="sns-icon" />
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
}

.top-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  width: 70%;
  background-image: linear-gradient(to bottom right,
      oklch(80% 0.4 222),
      oklch(35% 0.5 313));
  border-radius: 0.5rem;
  filter: drop-shadow(2px 4px 6px black);

  h2 {
    padding: 0 0 1rem;
  }

  @media screen and (max-width: 700px) {
    width: 100%;
    background-image: linear-gradient(0deg,
        rgba(69, 69, 214, 1) 0%,
        rgba(0, 212, 255, 1) 100%);
  }
}

.card-content {
  position: relative;
  margin: 3vh 3vh 0;

  ul {
    line-height: 1.5;
    margin: 0;
  }
}

.card-bottom {
  position: relative;
  text-align: right;
  padding: 0 3vh 3vh;

  .more-detail-button {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    border: 1px solid white;
    cursor: pointer;
    transition: all 0.2s;
    color: white;

    &:hover {
      text-decoration: none;
    }
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

.sns-name {
  width: 100%;
  font-size: 0.5rem;
  opacity: 0.7;
}

.sns-twitter {
  background-color: #1da1f2;
  color: white;
}

.sns-github {
  background-color: #0e0c0d;
  color: white;
}

.sns-zenn {
  background-color: #3ea8ff;
  color: white;
}

.sns-qiita {
  background-color: #55c500;
  color: white;
}

.sns-icon {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
}
</style>
