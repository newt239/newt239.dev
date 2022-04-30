<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  document.title = "Score Watcher - NEWT HOUSE";
});
</script>

<template>
  <div class="about">
    <div class="intro">
      <h3>Score Watcher</h3>
      <div class="summary">
        <table>
          <tr>
            <th>GitHub</th>
            <td>
              <a href="https://github.com/newt239/score-watcher" target="_blank">newt239/score-watcher</a>
            </td>
          </tr>
          <tr>
            <th>Creation</th>
            <td>2021/08 - 2021/10</td>
          </tr>
          <tr>
            <th>Tech</th>
            <td>Electron, Vue.js (v2)</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="thumbnail">
      <img src="/img/score-watcher_thumbnail.webp" />
    </div>
  </div>
  <div class="content">
    <p>クイズ大会におけるプレイヤーのリアルタイムでの得点情報を可視化するためのデスクトップアプリです。N o M x, N updown といった基本的な形式だけでなく Attack Survival や Square X
      といった形式にも対応しています。同時に問題文を表示したりタイマーをセットすることもできます。プレイデータはjsonファイルとしてのエクスポートも可能です。</p>
    <h4>関連リンク</h4>
    <h5>インストール</h5>
    <ul>
      <li>
        <a class="url" href="https://github.com/newt239/score-watcher/releases"
          target="_blank">https://github.com/newt239/score-watcher/releases</a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
</style>