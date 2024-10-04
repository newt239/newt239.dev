<script lang="ts" setup>
useHead({
  title: "newt239.dev",
});
</script>

<template>
  <main>
    <div class="container">
      <Profile />
      <ThemeChanger />
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
      <MyTopTrackList />
    </div>
  </main>
</template>
