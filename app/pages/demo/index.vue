<script setup lang="ts">
import { useGravatars } from "~/stores/use-gravatars.store";
import { useOnceMounted } from "~/composables/utils/use-once-mounted-on";

const g = useGravatars();

useOnceMounted([], () => {
  g.start();
});

// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <h2>page:demo</h2>
    <VBtn @click="() => g.enable(true)">enable</VBtn>
    <VBtn @click="() => g.enable(false)">disable</VBtn>
    <VBtn @click="() => g.refresh()">refresh</VBtn>
    <pre>src: {{ g.src }}</pre>
    <img :src="g.src" v-if="g.enabled" />
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
