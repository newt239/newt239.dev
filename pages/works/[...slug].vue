<script lang="ts" setup>
import { IconChevronLeft } from "@tabler/icons-vue";

useHead({
  titleTemplate: "%s - newt239.dev",
});
</script>

<template>
  <main>
    <div class="container each-work-page">
      <div class="category-name">Works</div>
      <div class="work">
        <ContentDoc v-slot="{ doc }">
          <templete #default>
            <div class="about-work">
              <div class="intro">
                <h1 :style="`view-transition-name: ${doc._path!.split('/')[2]}-name;`">{{ doc.title }}</h1>
                <div class="summary">
                  <table>
                    <tbody>
                      <tr v-if="doc.github">
                        <th>GitHub</th>
                        <td>
                          <a :href="`https://github.com/${doc.github}`" target="_blank">{{ doc.github }}</a>
                        </td>
                      </tr>
                      <tr>
                        <th>製作時期</th>
                        <td>{{ doc.creation }}</td>
                      </tr>
                      <tr>
                        <th>使用技術</th>
                        <td>{{ doc.tech }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="thumbnail-wrapper">
                <img class="thumbnail" :src="`/images/${doc.thumbnail}`" :alt="`${doc.title}のサムネイル画像`"
                  :style="`view-transition-name: ${doc._path!.split('/')[2]}-img;`" />
              </div>
            </div>
            <div class="content">
              <ContentRenderer :value="doc" />
            </div>
          </templete>
          <templete #not-found>
            <p>Not Found</p>
          </templete>
        </ContentDoc>
      </div>
      <div class="after-content">
        <NuxtLink class="back" to="/">
          <IconChevronLeft />
          BACK HOME
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style>
.each-work-page {
  .category-name {
    view-transition-name: work-category-name;
  }

  .work {
    border: 2px solid rgb(var(--color-text));
    border-radius: 1rem;

    a,
    p code {
      word-break: break-all;
    }

    .about-work {
      display: flex;
      justify-content: space-between;

      >.intro {
        >h1 {
          padding: 0 1rem;
          margin-top: 1rem;
        }

        .summary {
          table {
            border-spacing: 0 0.5rem;

            th,
            td {
              padding: 0 1rem;
            }

            th {
              border-right: 1px rgb(var(--color-text)) solid;
            }
          }
        }
      }

      .thumbnail-wrapper {
        width: 50%;
        margin: .5rem;

        >.thumbnail {
          width: 100%;
          object-fit: cover;
          border-radius: calc(1rem - 2px);
        }
      }

      @media (max-width: 768px) {
        flex-direction: column-reverse;

        .thumbnail-wrapper {
          width: calc(100% - 1rem);
        }

        .intro h1 {
          margin: 0px;
        }
      }
    }

    .content {
      padding-bottom: 1rem;

      p {
        margin: 1rem;
      }

      ul {
        margin: 0.5rem 1.5rem;
      }

      h2 {
        display: inline-block;
        padding: 1rem 1rem 0;
        letter-spacing: 0;
        margin: 0;
        font-size: 1.5rem;
        border-bottom: rgb(var(--color-text)) 1px solid;
      }

      h3 {
        padding-left: 1rem;
      }

      h2,
      h3,
      h4,
      h5 {
        a {
          color: rgb(var(--color-text));
        }
      }

      table {
        margin: 0 1rem;
        border-spacing: 0 0.5rem;

        th,
        td {
          text-align: left;
          padding: 0 1rem;
        }

        th {
          border-bottom: 1px rgb(var(--color-text)) solid;
        }
      }

      code,
      pre {
        padding: 0.2rem;
        background-color: rgb(var(--color-text-tertiary));
        cursor: text;
      }

      code {
        margin: 0;
      }

      pre {
        margin: 0.5rem 0;
        overflow-x: auto;
      }

      p:has(img) {
        text-align: center;

        img {
          max-width: calc(100% - 1rem);
          max-height: 50vh;
          border-radius: 0.5rem;
        }
      }
    }
  }

  .after-content {
    padding: 1rem;
    text-align: center;

    .back {
      display: inline-block;
      padding: 0.5rem 1rem;
      border: none;
      font-size: 1rem;
      color: rgb(var(--color-text));
      background-color: transparent;
      cursor: pointer;
      transition: all 0.2s;

      @media (hover: hover) {
        &:hover {
          opacity: 0.5;
        }
      }

      @media (hover: none) {
        &:active {
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
