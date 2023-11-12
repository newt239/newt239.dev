<script lang="ts" setup>
useHead({
  title: "newt239",
  meta: [
    {
      name: "description",
      content: "newt239のポートフォリオサイト",
    },
  ],
});
</script>

<template>
  <main>
    <div class="container">
      <Profile />
    </div>
    <div class="container">
      <WorkList />
      <div class="flex">
        <ArticleList />
        <Contact />
      </div>
      <MyTopTrackList />
    </div>
  </main>
</template>
