<template>
  <main>
    <h2>WORKS</h2>
    <div class="work">
      <ContentDoc v-slot="{ doc }">
        <div class="about">
          <div class="intro">
            <h3>{{ doc.title }}</h3>
            <div class="summary">
              <table>
                <tr v-if="doc.github">
                  <th>GitHub</th>
                  <td>
                    <a
                      :href="`https://github.com/${doc.github}`"
                      target="_blank"
                      >{{ doc.github }}</a
                    >
                  </td>
                </tr>
                <tr>
                  <th>Creation</th>
                  <td>{{ doc.creation }}</td>
                </tr>
                <tr>
                  <th>Tech</th>
                  <td>{{ doc.tech }}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="thumbnail">
            <img :src="`/images/${doc.thumbnail}`" />
          </div>
        </div>
        <div class="content">
          <p>{{ doc.description }}</p>
          <ContentRenderer :value="doc" />
        </div>
      </ContentDoc>
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
      padding: 0 0.3rem;
      border-radius: 0.5rem;
      margin: 0 0.2rem;
      background-color: $color-black-secondary;
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
    border-radius: 0.5rem;
    color: $color-white;

    &::before {
      padding-right: 5px;
      content: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>');
      vertical-align: -0.1rem;
    }
  }
}
</style>
