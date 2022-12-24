<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import moment from "moment";

const time = ref(moment().format("HH:mm"));
const day = ref(moment().format("YY/MM/DD"));

onMounted(() => {
  setInterval(() => {
    time.value = moment().format("HH:mm");
  }, 1000 * 60);
});
</script>

<template>
  <RouterLink to="/" class="headerWrapper">
    <header>
      <div class="headerMain">
        <img src="/logo.svg" />
        <span>newt</span>
      </div>
      <div class="headerWidget">
        <div>{{ day }}</div>
        <div>{{ time }}</div>
      </div>
    </header>
  </RouterLink>
</template>

<style lang="scss" scoped>
a {
  &:hover {
    opacity: 1;
  }
}
.headerWrapper {
  display: block;
  position: sticky;
  width: 100%;
  top: 0;
  color: $color-white;
  background-color: rgba(33, 33, 33, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid $color-black;
  padding: max(0.5rem, min(2vh, 2vw));
  z-index: 10;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 92%;
    max-width: 1280px;
    margin: 0 auto;

    .headerMain {
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

    .headerWidget {
      text-align: right;
      font-size: max(0.7rem, min(2.5vh, 2.5vw));
      line-height: max(1rem, min(3vh, 3vw));
      letter-spacing: 0.1rem;
    }
  }
}
</style>
