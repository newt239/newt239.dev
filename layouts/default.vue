<template>
  <Header />
  <div class="wrapper">
    <slot />
    <div class="copyright">© 2022 newt</div>
  </div>
</template>

<style lang="scss">
.wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 0.5rem;

  .copyright {
    padding: 1rem;
    width: 100%;
    text-align: center;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: $color-black;

  .atom-spinner {
    margin: 0 auto;
    margin-top: 50vh;
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 1s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
