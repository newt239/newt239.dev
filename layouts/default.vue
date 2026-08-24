<template>
  <div>
    <a class="skip-link" href="#main-content">本文へスキップ</a>
    <Header />
    <div id="main-content" tabindex="-1" class="wrapper">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style>
.wrapper {
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
}

#main-content:focus {
  outline: none;
}

.skip-link {
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 200;
  padding: 0.5rem 1rem;
  color: rgb(var(--text));
  background-color: rgb(var(--bg));
  border: var(--border-width) solid rgb(var(--text));
  border-radius: var(--radius-sm);
  translate: 0 -200%;
  transition: var(--transition);
}

.skip-link:focus {
  translate: 0 0;
}
</style>
