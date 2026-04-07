<script setup lang="ts">
import { useToggleFlag } from "~/composables/utils/use-toggle-flag";

const tgl = useToggleFlag();

// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <h2>page:demo</h2>
    <VBtn @click="tgl">ok</VBtn>
    <AppDrawerDefault v-model="tgl.isActive.value" />
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
