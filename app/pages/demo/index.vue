<script setup lang="ts">
import { onDebug } from "~/utils/on-debug";
const demo = () => {
  console.log(useNuxtApp().$$.config("keys.TOKEN_API_AUTH"));
};

// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <h1>page:demo</h1>
    <VBtn @click="demo">ok</VBtn>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
