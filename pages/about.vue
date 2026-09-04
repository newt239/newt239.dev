<script setup lang="ts">
import { IconExternalLink } from "@tabler/icons-vue";

import { person } from "~/libs/person";

usePageSeo({ title: "わたしについて", ogImage: "https://newt239.dev/og/about.png" });

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": "https://newt239.dev/about#webpage",
        name: "わたしについて - newt239.dev",
        url: "https://newt239.dev/about",
        inLanguage: "ja",
        isPartOf: { "@id": "https://newt239.dev/#website" },
        mainEntity: person,
      },
    },
  ],
});

const contacts = [
  { label: "メール", items: [{ href: `mailto:${person.email}`, text: person.email }] },
  {
    label: "Discordサーバー",
    items: [{ href: "https://discord.gg/rct5sx6rbZ", text: "https://discord.gg/rct5sx6rbZ" }],
  },
] as const;

const interests = [
  { category: "Webフロントエンド", items: ["Webアクセシビリティ", "Web 標準化", "Web API"] },
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
      "正反対な君と僕",
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
  { href: "https://www.linkedin.com/in/newt239/", label: "LinkedIn" },
] as const;
</script>

<template>
  <div>
    <div class="container about-page">
      <div class="about-hero">
        <img src="/icon.webp" alt="" class="profile-icon">
        <div class="hero-info">
          <h1 v-colorful-heading>newt <span class="sub">@newt239</span></h1>
          <dl class="basic-info">
            <dt>誕生日</dt>
            <dd>{{ new Date(person.birthDate).toLocaleDateString("ja-JP", { dateStyle: "long", timeZone: "UTC" }) }}</dd>
            <dt>所属</dt>
            <dd>芝浦工業大学 3年<br>デザイン工学部 デザイン工学科<br>ロボティクス・情報デザイン系</dd>
          </dl>
        </div>
      </div>

      <div class="about-sections">
        <section id="contact" class="about-section" tabindex="-1">
          <h2 class="section-heading">コンタクト</h2>
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
          <h2 class="section-heading">興味・関心</h2>
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
          <h2 class="section-heading">趣味</h2>
          <div class="section-body hobbies">
            <div v-for="hobby in hobbies" :key="hobby.title">
              <h3>{{ hobby.title }}</h3>
              <ul>
                <li v-for="item in hobby.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="about-section">
          <h2 class="section-heading">リンク集</h2>
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
              <IconExternalLink class="external-icon" />
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style>
.about-page {
  max-width: 800px;
  margin: 0 auto;

  .about-hero {
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;

    @media screen and (width <= 37.5rem) {
      flex-direction: column;
      align-items: center;
    }

    .profile-icon {
      flex-shrink: 0;
      width: 160px;
      height: 160px;
      object-fit: cover;
      border-radius: var(--radius-round);
      corner-shape: round;

      @media screen and (width <= 37.5rem) {
        align-self: center;
      }
    }

    .hero-info {
      h1 {
        padding: 0 0 0.5rem;
      }

      .basic-info {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.25rem 1rem;
        padding: 0;
        margin: 0;

        dt {
          padding-top: 0.25rem;
          font-size: 0.75rem;
          font-weight: 800;
          color: rgb(var(--text-muted));
        }

        dd {
          margin: 0;
          line-height: var(--line-height-tight);
        }
      }

      @media screen and (width <= 37.5rem) {
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
      padding: 0;
      margin: 0 0 0.25rem;
      font-size: 1rem;
    }

    .hobbies {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(12.5rem, 100%), 1fr));
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
      gap: 0.25rem;
      align-items: center;
      padding: 0.75rem 1.5rem;
      font-weight: 800;
      color: rgb(var(--accent));
      text-decoration: underline;
      text-decoration-style: dashed;
      text-underline-offset: 0.25rem;
      transition: var(--transition);

      .external-icon {
        width: var(--external-link-icon-size);
        height: var(--external-link-icon-size);
        margin-left: var(--external-link-icon-gap);
        vertical-align: var(--external-link-icon-shift);
      }

      &:not(:last-child) {
        border-bottom: var(--border-width-hairline) solid rgb(var(--border));
      }

      /* 親の .link-list が overflow: hidden なので外側に描くとリングが完全に隠れる */
      &:focus-visible {
        outline-offset: calc(var(--focus-ring-offset) * -1);
      }

      @media (hover: hover) {
        &:hover {
          text-decoration-color: transparent;
          background: rgb(var(--surface));
          opacity: var(--hover-opacity);
        }
      }

      @media (hover: none) {
        &:active {
          background: rgb(var(--surface));
        }
      }
    }
  }
}
</style>
