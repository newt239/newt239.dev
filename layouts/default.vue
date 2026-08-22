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
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
}

#main-content:focus {
  outline: none;
}

.skip-link {
  position: fixed;
  /* ヘッダー（100）より前面に出さないと、現れた瞬間にヘッダーの裏へ入る */
  z-index: 200;
  top: 0.5rem;
  left: 0.5rem;
  padding: 0.5rem 1rem;
  color: rgb(var(--text));
  background-color: rgb(var(--bg));
  border: var(--border-width) solid rgb(var(--text));
  border-radius: var(--radius-sm);
  translate: 0 -200%;
  transition: var(--transition);
}

/* 支援技術によるフォーカス移動でも隠れたままにならないよう :focus で出す */
.skip-link:focus {
  translate: 0 0;
}
</style>
