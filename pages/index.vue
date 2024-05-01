<script lang="ts" setup>
useHead({
  title: "newt239.dev",
});
</script>

<template>
  <main>
    <div class="container">
      <Profile />
    </div>
    <div class="container">
      <WorkList featured />
      <LatestArticleList />
      <MyTopTrackList />
    </div>
  </main>
</template>
