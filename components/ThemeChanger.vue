<script setup lang="ts">
const model = defineModel();
const onSubmit = async () => {
  const { data } = await useFetch("/api/ai-theme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: model.value,
    }),
  });
  console.log(data.value);
  const r = document.documentElement;
  if (r) {
    r.style.setProperty('--color-back', "0, 0, 0");
  }
}
</script>

<template>
  <div class="themeChanger">
    <input type="text" id="themeChangerInput" v-model="model" />
    <button :onclick="onSubmit">Generate</button>
  </div>
</template>

<style>
.themeChanger {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
}
</style>