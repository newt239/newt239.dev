<script setup lang="ts">
useHead({
  title: "わたしについて - newt239.dev",
});
</script>

<template>
  <main>
    <div class="container">
      <div class="about-me">
        <img src="/icon.webp" alt="プロフィール画像" class="profile-icon" />
        <div>
          <h2>newt <span class="sub">@newt239</span></h2>
          <dl>
            <dt>誕生日</dt>
            <dd>2005年11月2日</dd>
            <dt>所属</dt>
            <dd>芝浦工業大学 学士1年</dd>
            <dd>デザイン工学部 デザイン工学科</dd>
            <dd>ロボティクス・情報デザイン系</dd>
          </dl>
        </div>
      </div>
      <div class="detail">
        <h3>開発</h3>
        <h4>環境</h4>
        <ul>
          <li>MacBook Air M3 / 16GB, 256GB</li>
          <li>Visual Studio Code</li>
        </ul>
        <h4>言語や技術</h4>
        <ul>
          <li>TypeScript</li>
          <ul>
            <li>React, Next.js, Remix, Vue.js, Nuxt, Astro, Svelte, Hono, Electron</li>
            <li>MUI, Chakra UI, Mantine, radix-ui, shadcn/ui</li>
            <li>Emotion, Panda CSS, Kuma UI, Tailwind</li>
            <li>jotai, Recoil</li>
          </ul>
          <li>Python</li>
          <ul>
            <li>Selenium, BeautifulSoup, pycord</li>
          </ul>
          <li>Go</li>
          <ul>
            <li>gorm, discordgo, goquery</li>
          </ul>
          <li>Rust</li>
          <ul>
            <li>勉強中。Tauri で利用したことがあります</li>
          </ul>
          <li>C++</li>
          <ul>
            <li>AtCoder茶で書く程度</li>
          </ul>
          <li>LaTeX</li>
        </ul>
        <h3>趣味</h3>
        <h4>好きなアニメ</h4>
        <ul>
          <li>響け！ユーフォニアム</li>
          <li>色づく世界の明日から</li>
          <li>リコリス・リコイル</li>
          <li>やはり俺の青春ラブコメはまちがっている。</li>
          <li>Charlotte</li>
        </ul>
        <h4>好きなアーティスト</h4>
        <ul>
          <li>DECO*27</li>
          <li>Orangestar</li>
          <li>HoneyWorks</li>
          <li>Mrs. GREEN APPLE</li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style>
.sub {
  font-size: 50%;
  color: rgb(var(--color-text-secondary));
}

.about-me {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }

  h2 {
    padding: 0 0 0.5rem;
  }
}

.profile-icon {
  width: 80%;
  max-width: 250px;
  height: auto;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  display: block;
}

.detail {
  margin: 0 auto;
  width: 100%;
  max-width: 600px;

  ul {
    width: fit-content;
    padding-left: 2rem;
  }
}
</style>