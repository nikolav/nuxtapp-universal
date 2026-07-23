<script setup lang="ts">
// @@eos
</script>

<template>
  <div
    class="app-container-reset component--AppNavMain d-flex justify-center gap-2"
  >
    <NuxtLinkLocale :to="{ name: 'demo' }">demo</NuxtLinkLocale>
    <span> | </span>
    <NuxtLinkLocale :to="{ name: 'index' }">home</NuxtLinkLocale>
    <span> | </span>
    <NuxtLinkLocale :to="{ name: 'about' }">about</NuxtLinkLocale>
  </div>
</template>

<!-- scoped component styles -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles -->
<style lang="scss"></style>
