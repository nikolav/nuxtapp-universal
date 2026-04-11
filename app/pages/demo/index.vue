<script setup lang="ts">
import { vDemo } from "~/directives/v-demo";
// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <h1>page:demo</h1>
    <div class="flex justify-center">
      <button v-demo>ok</button>
    </div>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
