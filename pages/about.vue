<script setup lang="ts">
useHead({
  title: "わたしについて - newt239.dev",
});
</script>

<template>
  <main>
    <div class="container about-page">
      <div class="about-me-space" />
      <div class="about-me">
        <img src="/icon.webp" alt="プロフィール画像" class="profile-icon">
        <div class="short-description">
          <h2>newt <span class="sub">@newt239</span></h2>
          <h4>誕生日</h4>
          <div>2005年11月2日</div>
          <h4>所属</h4>
          <div>芝浦工業大学 2年</div>
          <div>デザイン工学部 デザイン工学科</div>
          <div>ロボティクス・情報デザイン系</div>
        </div>
      </div>
      <div class="profile-detail">
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
        <h3>興味・関心</h3>
        <ul>
          <li>Webフロントエンド
            <ul>
              <li>Web 標準化</li>
              <li>
                Web API
              </li>
            </ul>
          </li>
          <li>UI/UX, デザイン
            <ul>
              <li>フォント</li>
            </ul>
          </li>
        </ul>
        <h3>趣味</h3>
        <h4>好きなアニメ</h4>
        <ul>
          <li>アオのハコ</li>
          <li>響け！ユーフォニアム</li>
          <li>色づく世界の明日から</li>
          <li>リコリス・リコイル</li>
          <li>やはり俺の青春ラブコメはまちがっている。</li>
          <li>Charlotte</li>
        </ul>
        <h4>好きなアーティスト</h4>
        <ul>
          <li>*Luna</li>
          <li>DECO*27</li>
          <li>Orangestar</li>
          <li>HoneyWorks</li>
          <li>Mrs. GREEN APPLE</li>
        </ul>
        <h4>好きな書体</h4>
        <ul>
          <li>LINE Seed JP</li>
          <li>ユールカ</li>
          <li>新ゴ</li>
          <li>筑紫アンティークゴシック</li>
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
.about-page {
  position: relative;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 1080px) {
    flex-direction: column;
  }

  .about-me-space {
    width: 50%;
    height: 100vh;

    @media screen and (max-width: 1080px) {
      display: none;
    }
  }

  .about-me {
    position: fixed;
    padding-right: 2rem;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-100%);
    width: calc(50% + 2rem);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 550px;
    gap: 2rem;

    @media screen and (max-width: 1080px) {
      flex-direction: row;
      position: relative;
      transform: none;
      top: 0;
      left: 0;
      width: 100%;
      flex-direction: column;
      margin: 0 auto;
      padding-right: 0;

      .short-description {
        width: 100%;
      }
    }

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
    width: 50%;
    max-width: 600px;
    padding-top: 2rem;
    margin-top: 2rem;

    @media screen and (max-width: 1080px) {
      width: 100%;
      max-width: 1080px;
      ;
      margin: 0;
    }

    h3 {
      position: relative;
      display: inline-block;
      width: 100%;
      text-align: center;
    }

    h3:before,
    h3:after {
      content: '';
      position: absolute;
      top: 60%;
      display: inline-block;
      width: calc(50% - 4rem);
      height: 1px;
      background-color: rgb(var(--color-text-secondary));
    }

    h3:before {
      left: 0;
    }

    h3:after {
      right: 0;
    }

    h4 {
      padding-left: 0;
    }
  }
}
</style>
