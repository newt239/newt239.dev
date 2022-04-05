<script setup lang="ts">
import { ref, onMounted } from "vue"
import { RouterLink, RouterView } from 'vue-router'
import moment from "moment"

const daytime = ref(moment().format('YY/MM/DD h:mm'));
const dow = ref(moment().format('ddd'));

onMounted(() => {
  setInterval(() => {
    daytime.value = moment().format('YY/MM/DD h:mm');
  }, 1000 * 60)
});
</script>

<template>
  <RouterLink to="/" class="headerWrapper">
    <header>
      <div class="headerMain">
        <img src="/img/logo.svg" />
        <h1>newt</h1>
      </div>
      <div class="headerWidget">
        <div>{{ dow }}</div>
        <div>{{ daytime }}</div>
      </div>
    </header>
  </RouterLink>
  <div class="wrapper">
    <RouterView />
    <div class="copyright">© 2022 newt</div>
  </div>
</template>

<style lang="scss">
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 0.5rem;
  .wrapper {
    padding: 0 0.5rem;
  }
}

.headerWrapper {
  display: block;
  position: sticky;
  width: 92%;
  transform: translateX(4%);
  top: 0;
  color: $color-white;
  background-color: $color-black;
  padding: 0.8rem 1rem 1rem;
  border: 0.1rem $color-white solid;
  border-top: 0;
  border-radius: 0 0 2rem 2rem;
  z-index: 10;
  filter: drop-shadow(2px 4px 6px black);
  &:hover {
    opacity: 1;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: end;
    .headerMain {
      display: flex;
      align-items: center;
      gap: min(5vh, 5vw);
      img {
        max-height: min(10vh, 10vw);
      }
      h1 {
        margin: 0;
        font-size: min(5vh, 5vw);
        font-weight: 800;
      }
    }
    .headerWidget {
      text-align: right;
      font-size: min(2.5vh, 2.5vw);
      line-height: min(2.5vh, 2.5vw);
    }
  }
}

.copyright {
  padding: 1rem;
  width: 100%;
  text-align: center;
}
</style>
