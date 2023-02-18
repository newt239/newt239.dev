<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import dayjs from "dayjs";

const time = ref(dayjs().format("HH:mm"));
const day = ref(dayjs().format("YY/MM/DD"));

onMounted(() => {
  setInterval(() => {
    time.value = dayjs().format("HH:mm");
  }, 1000 * 60);
});
</script>

<template>
  <header>
    <RouterLink to="/">
      <div class="logo">
        <img src="/logo.svg" />
        <span>newt</span>
      </div>
      <div class="widget">
        <div>{{ day }}</div>
        <div>{{ time }}</div>
      </div>
    </RouterLink>
  </header>
</template>

<style lang="scss">
header {
  background-image: none;
  display: flex;
  flex-direction: column;
  position: sticky;
  z-index: 5;
  width: 100%;
  top: 0;
  left: auto;
  right: 0px;
  padding: max(0.5rem, min(2vh, 2vw));
  color: $color-white;
  backdrop-filter: blur(8px);
  border-style: solid;
  border-color: rgba(194, 224, 255, 0.08);
  border-width: 0px 0px thin;
  background-color: rgba(33, 33, 33, 0.7);
  a {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $color-white;
    width: 92%;
    max-width: 1280px;
    margin: 0 auto;
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
</style>
