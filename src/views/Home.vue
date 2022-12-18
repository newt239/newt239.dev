<script setup lang="ts">
import { onMounted } from "vue";
import WorkList from "@/components/WorkList.vue";
import MyTopTracks from "@/components/MyTopTracks.vue";
import ContactList from "@/components/ContactList.vue";

onMounted(() => {
  document.title = "NEWT HOUSE";
});
</script>

<template>
  <main>
    <h2>WORKS</h2>
    <WorkList />
    <h2>MY TOP TRACKS</h2>
    <MyTopTracks />
    <h2>CONTACT</h2>
    <ContactList />
  </main>
</template>
