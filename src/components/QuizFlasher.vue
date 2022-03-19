<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    document.title = "Quiz Flasher - NEWT HOUSE";
});
</script>

<template>
    <div class="about">
        <div class="intro">
            <h3>Quiz Flasher</h3>
            <div class="summary">
                <table>
                    <tr>
                        <th>Creation</th>
                        <td>2019/11 - 2020/07</td>
                    </tr>
                    <tr>
                        <th>Tech</th>
                        <td>GAS ( Google Apps Script )</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="thumbnail">
            <img src="/img/quiz-flasher-screenshot.webp" />
        </div>
    </div>
    <div class="content">
        <p>問題データを入れたGoogleスプレッドシートのファイルから、ランダムに問題を出題するツール。すべてのシートから出題させたり、特定のシートの特定の問題のみで出題させることもできる。多分(おそらく)JavaScriptを初めて使って作った作品。バックエンド的に使うのももちろんだが、モーダルウィンドウなどデザイン面での利用もこれが初。</p>
        <h4>API</h4>
        <p>
            クイズ出題の部分はAPI化したものもあるので仕様を載せておく。メソッドは全て
            <code>GET</code>。メンテナンスはしていないためずっと使える保証はないです。なお LINE bot の方はこのAPIを利用している。
        </p>
        <h5>Base url</h5>
        <ul>
            <li>
                <code>https://script.google.com/macros/s/AKfycbzOi_ACgcxDldiJ-8kVS5Hxxe8i37O168mubm95taRE7kAZ9a9Q/exec</code>
            </li>
        </ul>
        <h5>Parameter</h5>
        <table>
            <tr>
                <th>
                    <code>t</code>
                </th>
                <td>
                    <code>show</code>
                </td>
                <td>
                    タイプ。基本は
                    <code>show</code>で固定。
                </td>
            </tr>
            <tr>
                <th>
                    <code>p</code>
                </th>
                <td>String</td>
                <td>スプレッドシートのid。非公開設定のものは無理</td>
            </tr>
            <tr>
                <th>
                    <code>s</code>
                </th>
                <td>Number</td>
                <td>シートの番号。0を始点として何個目のシートか</td>
            </tr>
            <tr>
                <th>
                    <code>o</code>
                </th>
                <td>boolean</td>
                <td>
                    オプショナル。
                    <code>true</code>にすると4列目の文字を回答の末尾に出力。作問者情報を入れたいときなどに使ってください
                </td>
            </tr>
        </table>
    </div>
</template>

<style lang="scss" scoped>
</style>