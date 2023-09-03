<script lang="ts" setup>
useServerSeoMeta({
  title: "newt239",
  description: "newt239のポートフォリオサイト",
});
</script>

<template>
  <main>
    <Profile />
    <WorkList />
    <div class="flex">
      <ArticleList />
      <Contact />
    </div>
    <MyTopTrackList />
  </main>
</template>

<style lang="scss">
.flex {
  display: flex;
  flex-direction: row;
  column-gap: 3rem;
  justify-content: space-between;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
}
</style>
