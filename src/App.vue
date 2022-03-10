<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <svg
      viewBox="0 0 36 36"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
    >
      <mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
        <rect width="36" height="36" rx="72" fill="#FFFFFF" />
      </mask>
      <g mask="url(#mask__beam)">
        <rect width="36" height="36" fill="#ff9600" />
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          transform="translate(8 -4) rotate(198 18 18) scale(1)"
          fill="#0099ff"
          rx="6"
        />
        <g transform="translate(4 -1) rotate(-8 18 18)">
          <path d="M15 19c2 1 4 1 6 0" stroke="#FFFFFF" fill="none" stroke-linecap="round" />
          <rect x="11" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF" />
          <rect x="23" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF" />
        </g>
      </g>
    </svg>
    <h1>newt</h1>
  </header>
  <RouterView />
  <div class="copyright">(c) 2022 newt</div>
</template>

<style lang="scss">
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
}

header {
  display: flex;
  align-items: center;
  gap: 2rem;
}

main {
  margin: 1rem;
}

.copyright {
  width: 100%;
  text-align: center;
}
</style>
