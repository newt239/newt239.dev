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
        .intro {
            .summary {
                table {
                    border-spacing: 0 0.5rem;
                    th,
                    td {
                        padding: 0 1rem;
                    }
                    th {
                        border-right: 1px $color-white solid;
                    }
                }
            }
        }
        .thumbnail {
            width: 50%;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 0 1rem 0 0;
            }
        }
        @include mq(tablet) {
            flex-direction: column-reverse;
            .thumbnail {
                width: 100%;
                img {
                    border-radius: 1rem 1rem 0 0;
                }
            }
            .intro h3 {
                margin: 0;
            }
        }
    }
    .content {
        padding-bottom: 1rem;
        p,
        ul {
            margin: 1rem;
        }
        h4 {
            display: inline-block;
            padding: 0 1rem;
            margin-bottom: 0;
            font-size: 1.5rem;
            border-bottom: $color-white 1px solid;
        }
        h5 {
            font-size: 1.3rem;
            margin: 1rem 1rem 0;
        }
        h6 {
            margin: 0 1rem;
            font-size: 1rem;
        }
        table {
            margin: 0 1rem;
            border-spacing: 0 0.5rem;
            th,
            td {
                padding: 0 1rem;
            }
            th {
                border-right: 1px $color-white solid;
            }
        }
        code,
        pre {
            padding: 0.2rem 0.5rem;
            background-color: black;
        }
        pre {
            overflow-x: scroll;
        }
        .imageWrapper {
            text-align: center;
            img {
                max-width: calc(100% - 1rem);
                max-height: 50vh;
                filter: drop-shadow(2px 4px 6px black);
                border-radius: 0.5rem;
            }
        }
        .url {
            word-break: break-all;
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
        border-radius: 0.5rem;
        color: $color-white;
    }
}
</style>