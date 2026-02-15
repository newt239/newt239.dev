<template>
  <header>
    <NuxtLink to="/">
      <div class="logo">
        <img src="/logo.svg" alt="" />
        <span>newt239.dev</span>
      </div>
    </NuxtLink>
    <ThemeChanger />
  </header>
</template>

<style>
header {
  background-image: none;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1rem;
  position: sticky;
  z-index: 100;
  width: 100%;
  top: 0;
  left: auto;
  right: 0px;
  padding: 0.75rem max(1rem, (100vw - 1280px) / 2);
  color: rgb(var(--text));
  backdrop-filter: blur(8px);
  border-style: solid;
  border-color: rgb(var(--border));
  border-width: 0px 0px 1px;

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    color: rgb(var(--text));
    border-radius: 0.5rem;

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

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }

      img {
        height: 2.5rem;
        border-radius: 36% 64% 53% 47% / 41% 71% 29% 59%;
      }

      span {
        margin: 0;
        font-size: 2rem;
        font-weight: 800;
      }
    }
  }
}
</style>
