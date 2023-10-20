<template>
  <Header />
  <div class="wrapper">
    <slot />
  </div>
  <Footer />
</template>

<style lang="scss">
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
  min-height: 100vh;
}
</style>
