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
    <NuxtImg v-bind="$attrs" :src="logo" alt="" :width="size" :height="size" class="logo-light" />
    <NuxtImg v-bind="$attrs" :src="logoOnDark" alt="" :width="size" :height="size" class="logo-dark" />
  </template>
  <NuxtImg v-else v-bind="$attrs" :src="logo" alt="" :width="size" :height="size" />
</template>
