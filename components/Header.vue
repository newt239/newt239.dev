<template>
  <header>
    <div class="header-inner">
      <NuxtLink to="/">
        <div class="logo">
          <img src="/icon.png" alt="" width="40" height="40" />
          <span>newt239.dev</span>
        </div>
      </NuxtLink>
      <ThemeChanger />
    </div>
  </header>
</template>

<style>
header {
  background-image: none;
  position: sticky;
  z-index: 100;
  width: 100%;
  top: 0;
  left: auto;
  right: 0px;
  padding: 0.75rem 0;
  color: rgb(var(--text));
  backdrop-filter: blur(8px);
  border-style: solid;
  border-color: rgb(var(--border));
  border-width: 0 0 var(--border-width-hairline);

  .header-inner {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 1rem;
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding-inline: var(--container-padding-inline);
  }

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    color: rgb(var(--text));
    border-radius: var(--radius-sm);

    .logo {
      display: flex;
      align-items: center;
      gap: min(3vh, 3vw);
      transition: var(--transition);

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
        height: 2.5rem;
        width: auto;
        display: block;
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
