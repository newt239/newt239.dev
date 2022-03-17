<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    document.title = "SHIP Notify - NEWT HOUSE";
});
</script>

<template>
    <div class="about">
        <div class="intro">
            <h3>SHIP Notify</h3>
        </div>
        <img class="thumbnail" src="/img/ship-info-screenshot.webp" />
    </div>
    <div class="content">
        <p>
            SHIP ( Sakae Higashi Internet Program :
            <a
                href="https://ship.sakae-higashi.jp/"
                target="_blank"
            >SHIPトップ</a> ) や栄東中高ホームページの栄東ニュースを定期的にスクレイピングし、更新があれば通知するシステム。
        </p>
        <h4>システム構成</h4>
        <p>現在DiscordのサーバーとLINE公式アカウント、Twitter、Webで運用中。Discord.pyをheroku上で常時稼働させ、10分おきにループを回し予めセットしておいた時間になるとSHIPや栄東ニュースのスクレイピングなどを行っている。</p>
        <p>スクレイピングにはseleniumを使っている。中高それぞれの「連絡事項」「学習教材」「学校通信」のページを1日2～5回程度取得している。データベースに保存されていないものが見つかればそのリンクをクリックし、説明文やファイルのダウンロードとSHIP-notify側のデータベースへのアップロードを行っている。</p>
        <div class="imageWrapper">
            <img src="/img/ship-assistant-system-map.webp" />
        </div>
        <h4>関連リンク</h4>
        <h5>SHIP-Assistant on Web</h5>
        <ul>
            <li>
                <a
                    href="https://ship-assistant.web.app/"
                    target="_blank"
                >https://ship-assistant.web.app/</a>
            </li>
        </ul>
        <h5>Notion上で利用方法を説明したページ</h5>
        <ul>
            <li>
                <a
                    href="https://www.notion.so/newt-house/SHIP-Assistant-s-Note-c599cf2125364a80920b0447f76d717a"
                    target="_blank"
                >SHIP Assistant's Note</a>
            </li>
        </ul>
    </div>
</template>