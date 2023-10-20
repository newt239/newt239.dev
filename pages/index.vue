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
  <div class="container">
    <Profile />
  </div>
  <main id="home">
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

<style lang="scss">
#home {
  background-color: $color-black;
  width: 100%;
}
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}
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
