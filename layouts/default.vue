<template>
  <Header />
  <div class="wrapper">
    <slot />
  </div>
  <Footer />
</template>

<style lang="scss">
.wrapper {
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
}
</style>
