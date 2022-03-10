<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
    <main>
        <h2>WORKS</h2>
        <div class="work">
            <RouterView />
        </div>
    </main>
</template>

<style lang="scss" scoped>
.work {
    padding: 1rem;
    border: 1px $color-text solid;
    border-radius: 1rem;
}
</style>