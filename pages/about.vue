<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";

useHead({
  title: "わたしについて - newt239.dev",
});

const contacts = [
  { label: "メール", items: [{ href: "mailto:contact@newt239.dev", text: "contact@newt239.dev" }] },
  {
    label: "Discordサーバー",
    items: [{ href: "https://discord.gg/rct5sx6rbZ", text: "https://discord.gg/rct5sx6rbZ" }],
  },
] as const;

const interests = [
  { category: "Webフロントエンド", items: ["Web 標準化", "Web API"] },
  { category: "UI/UX, デザイン", items: ["フォント"] },
] as const;

const hobbies = [
  {
    title: "好きなアニメ",
    items: [
      "響け！ユーフォニアム",
      "色づく世界の明日から",
      "リコリス・リコイル",
      "アオのハコ",
      "やはり俺の青春ラブコメはまちがっている。",
      "Charlotte",
    ],
  },
  {
    title: "好きなアーティスト",
    items: ["DECO*27", "*Luna", "Orangestar", "HoneyWorks", "Mrs. GREEN APPLE"],
  },
  {
    title: "好きな書体",
    items: ["LINE Seed JP", "ユールカ", "新ゴ", "筑紫アンティークゴシック"],
  },
] as const;

const links = [
  { href: "https://newt239.hatenablog.com/", label: "はてなブログ" },
  { href: "https://mixi.social/@newt", label: "mixi2" },
  { href: "https://annict.com/@newt", label: "Annict" },
] as const;
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
              <li v-for="contact in contacts" :key="contact.label">
                {{ contact.label }}
                <ul>
                  <li v-for="item in contact.items" :key="item.text">
                    <a
                      :href="item.href"
                      :target="item.href.startsWith('http') ? '_blank' : undefined"
                      :rel="item.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                    >
                      {{ item.text }}
                    </a>
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
              <li v-for="interest in interests" :key="interest.category">
                {{ interest.category }}
                <ul>
                  <li v-for="item in interest.items" :key="item">{{ item }}</li>
                </ul>
              </li>
            </ul>
          </div>
        </section>

        <section class="about-section">
          <h3>趣味</h3>
          <div class="section-body hobbies">
            <div v-for="hobby in hobbies" :key="hobby.title">
              <h4>{{ hobby.title }}</h4>
              <ul>
                <li v-for="item in hobby.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="about-section">
          <h3>リンク集</h3>
          <div class="section-body link-list">
            <a
              v-for="link in links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="link-card"
            >
              {{ link.label }}
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
        display: flex;
        flex-direction: column;
        align-items: center;
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
      transition: background 0.15s, color 0.15s;

      &:not(:last-child) {
        border-bottom: 1px solid rgb(var(--border));
      }

      @media (hover: hover) {
        &:hover {
          background: rgb(var(--surface));
          color: rgb(var(--accent));
        }
      }

      @media (hover: none) {
        &:active {
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
