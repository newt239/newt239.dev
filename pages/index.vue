<script lang="ts" setup>
import { articleList, articleSite } from "~/libs/articles";
import { bio, personId } from "~/libs/person";
import { siteName, siteUrl } from "~/libs/site";

useSeoMeta({
  description: bio,
  ogDescription: bio,
  ogUrl: `${siteUrl}/`,
});

const recentArticles = articleList.toSorted((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

useDiscordEmbed([
  {
    type: 9,
    components: [{ type: 10, content: `# [${siteName}](${siteUrl}/)\n${bio}` }],
    accessory: {
      type: 11,
      media: { url: `${siteUrl}/icons/icon-192.png` },
      description: "newt239 のアイコン。麦わら帽子をかぶった青い髪のキャラクターのイラスト",
    },
  },
  { type: 14 },
  {
    type: 10,
    content: [
      "### 最近の記事",
      ...recentArticles.map((article) => {
        const date = new Date(article.date).toLocaleDateString("ja-JP", { dateStyle: "long", timeZone: "UTC" });
        return `[${article.title}](${article.url})\n-# ${articleSite(article.url).name}・${date}`;
      }),
    ].join("\n"),
  },
  {
    type: 1,
    components: [
      { type: 2, style: 5, label: "わたしについて", url: `${siteUrl}/about` },
      { type: 2, style: 5, label: "作品一覧", url: `${siteUrl}/works` },
      { type: 2, style: 5, label: "記事一覧", url: `${siteUrl}/articles` },
    ],
  },
]);

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        description: "newt239's portfolio site",
        url: siteUrl,
        inLanguage: "ja",
        author: { "@id": personId },
        publisher: { "@id": personId },
      },
    },
  ],
});
</script>

<template>
  <div>
    <h1 class="visually-hidden" lang="en">newt239.dev</h1>
    <div class="container">
      <Profile />
    </div>
    <div class="container">
      <FeaturedWorkList />
    </div>
    <div class="container">
      <LatestArticleList />
    </div>
    <div class="container">
      <Timeline />
    </div>
    <div class="container">
      <Certifications />
    </div>
    <div class="container">
      <LatestAlbumList />
    </div>
    <div class="container">
      <MyTopTrackList />
    </div>
  </div>
</template>
