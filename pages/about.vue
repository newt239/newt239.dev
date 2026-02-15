<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";

useHead({
  title: "わたしについて - newt239.dev",
});
</script>

<template>
  <main>
    <div class="container about-page">
      <div class="about-hero">
        <img src="/icon.webp" alt="プロフィール画像" class="profile-icon">
        <div class="hero-info">
          <h2>newt <span class="sub">@newt239</span></h2>
          <dl class="basic-info">
            <dt>誕生日</dt>
            <dd>2005年11月2日</dd>
            <dt>所属</dt>
            <dd>芝浦工業大学 2年<br>デザイン工学部 デザイン工学科<br>ロボティクス・情報デザイン系</dd>
          </dl>
        </div>
      </div>

      <div class="about-sections">
        <section class="about-section">
          <h3>コンタクト</h3>
          <div class="section-body">
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
                    <a href="https://discord.gg/rct5sx6rbZ" target="_blank" rel="noopener noreferrer">https://discord.gg/rct5sx6rbZ</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>

        <section class="about-section">
          <h3>興味・関心</h3>
          <div class="section-body">
            <ul>
              <li>Webフロントエンド
                <ul>
                  <li>Web 標準化</li>
                  <li>Web API</li>
                </ul>
              </li>
              <li>UI/UX, デザイン
                <ul>
                  <li>フォント</li>
                </ul>
              </li>
            </ul>
          </div>
        </section>

        <section class="about-section">
          <h3>趣味</h3>
          <div class="section-body hobbies">
            <div>
              <h4>好きなアニメ</h4>
              <ul>
                <li>アオのハコ</li>
                <li>響け！ユーフォニアム</li>
                <li>色づく世界の明日から</li>
                <li>リコリス・リコイル</li>
                <li>やはり俺の青春ラブコメはまちがっている。</li>
                <li>Charlotte</li>
              </ul>
            </div>
            <div>
              <h4>好きなアーティスト</h4>
              <ul>
                <li>*Luna</li>
                <li>DECO*27</li>
                <li>Orangestar</li>
                <li>HoneyWorks</li>
                <li>Mrs. GREEN APPLE</li>
              </ul>
            </div>
            <div>
              <h4>好きな書体</h4>
              <ul>
                <li>LINE Seed JP</li>
                <li>ユールカ</li>
                <li>新ゴ</li>
                <li>筑紫アンティークゴシック</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="about-section">
          <h3>リンク集</h3>
          <div class="section-body link-list">
            <a href="https://newt239.hatenablog.com/" target="_blank" rel="noopener noreferrer" class="link-card">
              はてなブログ
              <IconChevronRight :size="16" />
            </a>
            <a href="https://mixi.social/@newt" target="_blank" rel="noopener noreferrer" class="link-card">
              mixi
              <IconChevronRight :size="16" />
            </a>
            <a href="https://annict.com/@newt" target="_blank" rel="noopener noreferrer" class="link-card">
              Annict
              <IconChevronRight :size="16" />
            </a>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style>
.about-page {
  max-width: 800px;
  margin: 0 auto;

  .about-hero {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem 0;

    @media screen and (max-width: 600px) {
      flex-direction: column;
      align-items: center;
    }

    .profile-icon {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;

      @media screen and (max-width: 600px) {
        align-self: center;
      }
    }

    .hero-info {
      width: 100%;

      h2 {
        padding: 0 0 0.5rem;
      }

      .basic-info {
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.25rem 1rem;

        dt {
          font-weight: 700;
          font-size: 0.875rem;
          color: rgb(var(--text-muted));
          padding-top: 0.125rem;
        }

        dd {
          margin: 0;
          line-height: 1.5;
        }
      }

      @media screen and (max-width: 600px) {
        text-align: center;

        .basic-info {
          grid-template-columns: 1fr;
          justify-items: center;
          text-align: center;
        }
      }
    }
  }

  .about-sections {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-bottom: 2rem;
  }

  .about-section {
    h3 {
      font-size: 1.5rem;
      padding: 0 0 0.5rem;
      margin: 0;
    }

    h4 {
      padding: 0;
      margin: 0 0 0.25rem;
      font-size: 1rem;
    }

    .section-body {
      background: rgb(var(--surface));
      border-radius: 0.75rem;
      padding: 1rem 1.5rem;

      ul {
        margin: 0;
        padding-left: 1.25rem;
      }

      li {
        line-height: 1.8;
      }
    }

    .hobbies {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;

      > div {
        min-width: 0;
      }
    }

    .link-list {
      display: flex;
      flex-direction: column;
      gap: 0;
      padding: 0;
      overflow: hidden;
    }

    .link-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1.5rem;
      color: rgb(var(--text));
      text-decoration: none;
      font-weight: 600;
      transition: background 0.15s;

      &:not(:last-child) {
        border-bottom: 1px solid rgb(var(--border));
      }

      @media (hover: hover) {
        &:hover {
          background: rgb(var(--surface));
        }
      }

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    }
  }
}
</style>
