<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
    <main>
        <h2>WORKS</h2>
        <div class="work">
            <RouterView />
        </div>
        <div class="footer">
            <RouterLink class="back" to="/">BACK HOME</RouterLink>
        </div>
    </main>
</template>

<style lang="scss">
.work {
    border: 1px $color-white solid;
    border-radius: 1rem;
    .about {
        display: flex;
        justify-content: space-between;
        .thumbnail {
            width: 50%;
            height: auto;
            border-radius: 0 1rem 0 0;
        }
        @include mq(tablet) {
            flex-direction: column-reverse;
            .thumbnail {
                width: 100%;
                border-radius: 1rem 1rem 0 0;
            }
            .intro h3 {
                margin: 0;
            }
        }
    }
    .content {
        p {
            margin: 1rem;
        }
        h4 {
            display: inline-block;
            padding: 0 1rem;
            font-size: 1.5rem;
            border-bottom: $color-white 1px solid;
        }
    }
}
.footer {
    padding: 1rem;
    text-align: center;
    .back {
        display: inline-block;
        padding: 0.5rem 1rem;
        border: $color-white 1px solid;
        border-radius: 1rem;
        color: $color-white;
    }
}
</style>