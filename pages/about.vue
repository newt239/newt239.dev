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
        <div class="short-description">
          <h2>newt <span class="sub">@newt239</span></h2>
          <h4>誕生日</h4>
          <div>2005年11月2日</div>
          <h4>所属</h4>
          <div>芝浦工業大学 1年</div>
          <div>デザイン工学部 デザイン工学科</div>
          <div>ロボティクス・情報デザイン系</div>
        </div>
      </div>
      <div class="profile-detail">
        <h3>開発</h3>
        <h4>言語や技術</h4>
        <ul>
          <li>TypeScript</li>
          <ul>
            <li>React, Next.js, Remix, Nuxt, Astro, Hono, Electron</li>
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
            <li>Tauri</li>
          </ul>
          <li>C++</li>
          <ul>
            <li>AtCoder</li>
          </ul>
          <li>LaTeX</li>
        </ul>
        <h4>環境</h4>
        <ul>
          <li>MacBook Air M3</li>
          <ul>
            <li>16GB ユニファイドメモリ</li>
            <li>256GB SSD</li>
          </ul>
          <li>Visual Studio Code</li>
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
        <h3>コンタクト</h3>
        <ul>
          <li>
            メール
            <ul>
              <li><a href="mailto:contact@newt239.dev">contact@newt239.dev</a></li>
            </ul>
          </li>
          <li>
            Discordサーバー
            <ul>
              <li>
                <a href="https://discord.gg/rct5sx6rbZ" target="_blank">https://discord.gg/rct5sx6rbZ</a>
              </li>
            </ul>
          </li>
        </ul>
        <h3>リンク集</h3>
        <ul>
          <li><a href="https://bento.me/newt" target="_blank">Bento</a></li>
          <li><a href="https://annict.com/@newt" target="_blank">Annict</a></li>
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
  justify-content: space-between;
  width: 100%;
  max-width: 550px;
  gap: 2rem;
  margin: 0 auto;

  @media screen and (max-width: 700px) {
    flex-direction: column;

    .short-description {
      width: 100%;
    }
  }

  h2 {
    padding: 0 0 0.5rem;
  }

  h3,
  h4 {
    padding-left: 0;
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

.profile-detail {
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  border-width: 1px 0 0 0;
  border-style: solid;
  border-color: rgb(var(--color-text-secondary));
  padding-top: 2rem;
  margin-top: 2rem;

  h3,
  h4 {
    padding-left: 0;
  }
}
</style>