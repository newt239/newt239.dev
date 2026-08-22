<template>
  <div class="prose-table-scroll" tabindex="0" role="region" aria-label="表">
    <table>
      <slot />
    </table>
  </div>
</template>

<style scoped>
.prose-table-scroll {
  max-width: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
}
</style>
