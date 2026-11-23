<script setup lang="ts">
defineOptions({ inheritAttrs: false });

defineProps<{
  logo: string;
  logoOnDark?: string;
  size: number;
}>();
</script>

<template>
  <template v-if="logoOnDark">
    <img v-bind="$attrs" :src="logo" alt="" :width="size" :height="size" class="logo-light">
    <img v-bind="$attrs" :src="logoOnDark" alt="" :width="size" :height="size" class="logo-dark">
  </template>
  <img v-else v-bind="$attrs" :src="logo" alt="" :width="size" :height="size">
</template>
