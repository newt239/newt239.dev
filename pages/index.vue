<script lang="ts" setup>
useHead({
  title: "newt239",
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
