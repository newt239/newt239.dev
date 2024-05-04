<template>
  <header>
    <NuxtLink to="/">
      <div class="logo">
        <img src="/logo.svg" alt="ウェブサイトのロゴ" />
        <span>newt239.dev</span>
      </div>
    </NuxtLink>
    </input>
  </header>
</template>

<style>
header {
  background-image: none;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  position: sticky;
  z-index: 5;
  width: 100%;
  top: 0;
  left: auto;
  right: 0px;
  padding: 1rem max(1rem, (100vw - 1280px) / 2);
  color: rgb(var(--color-white));
  backdrop-filter: blur(8px);
  border-style: solid;
  border-color: rgba(var(--color-black-secondary), 0.8);
  border-width: 0px 0px 1px;

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    color: rgb(var(--color-white));

    .logo {
      display: flex;
      align-items: center;
      gap: min(3vh, 3vw);
      transition: all 0.2s;

      @media (hover: hover) {
        &:hover {
          opacity: 0.5;
        }
      }

      @media (hover: none) {
        &:active {
          opacity: 0.5;
        }
      }

      img {
        max-height: min(8vh, 8vw);
        min-height: 2rem;
      }

      span {
        margin: 0;
        font-size: max(1.5rem, min(5vh, 5vw));
        font-weight: 800;
      }
    }
  }
}

.toggle-color-mode-button {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(var(--color-black-secondary), 0.8);
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  border-radius: 0.5rem;
  gap: 0.5rem;
  cursor: pointer;
}
</style>
