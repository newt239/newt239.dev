<script lang="ts" setup>
import { personId } from "~/libs/person";
import { siteUrl } from "~/libs/site";

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "newt239.dev",
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
