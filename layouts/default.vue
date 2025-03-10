<script setup>
onMounted(() => {
  try {
    Typekit.load({ async: true });
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <div>
    <Header />
    <div class="wrapper">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style>
.wrapper {
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
}
</style>
