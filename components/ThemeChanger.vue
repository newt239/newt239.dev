<script lang="ts" setup>
const promptModel = defineModel();
const generateTheme = async () => {
  console.log("generating...");
  const data = await $fetch("/api/ai-theme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: promptModel.value,
    }),
  });
  const variables = data.variables;
  const r = document.documentElement;
  if (r) {
    variables.forEach((v: any) => {
      console.log(v)
      r.style.setProperty(`${v.variable_name}`, v.rgb);
    });
  }
  return;
}
</script>

<template>
  <div class="themeChanger">
    <input type="text" id="themeChangerInput" v-model="promptModel" />
    <button v-on:click="generateTheme">Generate</button>
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