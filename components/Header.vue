<script setup lang="ts">
import { IconSun, IconMoon } from "@tabler/icons-vue";

const colorMode = useColorMode();
</script>

<template>
  <header>
    <NuxtLink to="/">
      <div class="logo">
        <img src="/logo.svg" alt="ウェブサイトのロゴ" />
        <span>newt239.dev</span>
      </div>
    </NuxtLink>
    <div>
      <input id="toggle-color-mode" class="hidden" type="checkbox"
        @click="$colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'">
      <label for="toggle-color-mode" class="toggle-color-mode-button">
        <IconSun v-if="colorMode.value === 'light'" />
        <IconMoon v-else />
        <span class="hidden-mobile">
          {{ colorMode.value === 'light' ? 'Light' : 'Dark' }}
        </span>
      </label>
    </div>
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
  justify-content: space-between;
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
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    color: rgb(var(--color-white));
    max-width: 1280px;

    .logo {
      display: flex;
      align-items: center;
      gap: min(3vh, 3vw);

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

    .widget {
      text-align: right;
      font-size: max(0.7rem, min(2.5vh, 2.5vw));
      line-height: max(1rem, min(3vh, 3vw));
      letter-spacing: 0.1rem;
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
}
</style>
