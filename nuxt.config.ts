import { readdirSync } from "node:fs";

import { shikiTheme } from "./libs/shiki-theme";
import { siteName, siteUrl } from "./libs/site";
import { checkDiscordEmbeds } from "./scripts/check-discord-embeds";
import { writeCspScriptHashes } from "./scripts/write-csp-script-hashes";

// ライトボックスはクライアントでのみ描画されるため、変換なしの IPX ルートを明示的に prerender する
const originalImageRoutes = readdirSync("public/images").map(
  (file) => `/_ipx/_/images/${file}`
);

// Workers Builds のブランチプレビューには本番に無い画像があるため、Discord の埋め込み画像はプレビューのホストから読ませる
// エイリアスと Worker 名の連結が 63 文字を超えるとハッシュ付きに切り詰められ、URL を算出できないので本番を使う
const previewAlias = process.env.WORKERS_CI_BRANCH?.toLowerCase().replace(/[^a-z0-9]/g, "-");
const discordEmbedAssetOrigin =
  previewAlias && previewAlias !== "main" && /^[a-z]/.test(previewAlias) && `${previewAlias}-newt239`.length <= 63
    ? `https://${previewAlias}-newt239.newtpia.workers.dev`
    : siteUrl;

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/sitemap", "@nuxt/content", "@nuxt/image", "@nuxt/eslint", "@nuxt/a11y"],
  site: {
    url: siteUrl,
    name: siteName,
  },
  css: ["@/assets/styles/main.css"],
  app: {
    head: {
      htmlAttrs: {
        lang: "ja",
      },
      title: siteName,
      meta: [
        { name: "color-scheme", content: "light dark" },
        {
          key: "theme-color-light",
          name: "theme-color",
          media: "(prefers-color-scheme: light)",
          content: "#fff8f1",
        },
        {
          key: "theme-color-dark",
          name: "theme-color",
          media: "(prefers-color-scheme: dark)",
          content: "#1b1611",
        },
        { name: "text-scale", content: "scale" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: siteName },
        { property: "og:title", content: siteName },
        { property: "og:image", content: `${siteUrl}/og-image-2026.webp` },
        { property: "og:image:alt", content: siteName },
        { property: "og:locale", content: "ja_JP" },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:site", content: "@newt239" },
        { property: "twitter:creator", content: "@newt239" },
        { property: "twitter:domain", content: siteName },
        { property: "twitter:image", content: `${siteUrl}/og-image-2026.webp` },
      ],
      link: [
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/icons/favicon-32.png" },
        { rel: "icon", type: "image/png", sizes: "192x192", href: "/icons/icon-192.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/icons/apple-touch-icon.png" },
        { rel: "manifest", href: "/manifest.webmanifest" },
      ],
    },
    pageTransition: false,
  },

  runtimeConfig: {
    public: { discordEmbedAssetOrigin },
  },

  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      routes: originalImageRoutes,
    },
  },

  hooks: {
    "nitro:init": (nitro) => {
      if (!nitro.options.static) return;
      nitro.hooks.hook("close", async () => {
        await writeCspScriptHashes(nitro.options.output.publicDir);
        await checkDiscordEmbeds(nitro.options.output.publicDir);
      });
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: { default: shikiTheme },
        },
      },
    },
    experimental: {
      sqliteConnector: "native",
    },
  },

  image: {
    domains: ["i.scdn.co"],
  },

  vite: {
    $client: {
      build: {
        rollupOptions: {
          output: {
            manualChunks: (id: string) =>
              id.includes("@nuxtjs/mdc/dist/runtime/components/prose/") ? "prose" : undefined,
          },
        },
      },
    },
  },

  experimental: {
    viewTransition: true,
    defaults: {
      nuxtLink: {
        prefetchOn: { visibility: true, interaction: true },
      },
    },
  },

  compatibilityDate: "2024-07-15",
});
