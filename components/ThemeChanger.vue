<script lang="ts" setup>
const isModalOpen = ref(false);

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
      r.style.setProperty(`${v.name}`, v.rgb);
    });
  }
  return;
}
</script>

<template>
  <button class="modalToggle" v-on:click="isModalOpen = true;">Open</button>
  <div class="themeChanger" :v-show="isModalOpen">
    <input type="text" id="themeChangerInput" v-model="promptModel" />
    <button v-on:click="generateTheme">Generate</button>
  </div>
</template>

<style>
.modalToggle {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
}

.themeChanger {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
}
</style>