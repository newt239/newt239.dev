<script setup lang="ts">
</script>

<template>
  <main>
    <h2>WORKS</h2>
    <div class="cardGrid">
      <div class="card ship-notify">
        <h3>SHIP Notify</h3>
        <p>
          To notify the update of SHIP (
          <a
            href="https://ship.sakae-higashi.jp/"
            target="_blank"
          >https://ship.sakae-higashi.jp/</a> ) . Runnning on LINE ( as LINE Official Account ), Discord ( as bot at "SHIP Info" server ), Web, Twitter.
        </p>
      </div>
      <div class="card quiz-flasher">
        <h3>Quiz Flasher</h3>
        <p>A tool to give a quiz. Import quiz data from Google Spreadsheet, then display these randomly.</p>
      </div>
      <div class="card">
        <h3>Score Watcher</h3>
        <p>When you hold the quiz games, you need to create scoreboard for player and watcher. Usually, scoreboard makes with Microsoft Excel, but it's difficult to reuse, so you need to make scoreboard from scratch. This software reduce these labor.</p>
      </div>
    </div>
    <h2>CONTACT</h2>
    <p>
      GitHub:
      <a href="https://github.com/newt239" target="_blank">@newt239</a>
    </p>
  </main>
</template>

<style lang="scss" scoped>
.cardGrid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  .card {
    padding: 0 1rem;
    border: 1px $color-text solid;
    border-radius: 1rem;
  }
}
.ship-notify {
  grid-column: 1 2;
  grid-row: 1 2;
}
.quiz-flasher {
  grid-column: 2 3;
  grid-row: 1 2;
}
</style>