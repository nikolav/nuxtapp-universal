<script setup lang="ts">
// defineOptions({
//   name: "COMPONENT_NAME",
//   inheritAttrs: false,
// });

// @@eos
</script>

<template>
  <span class="app-container-reset component--AppNavLine inline-flex gap-2">
    <NuxtLinkLocale :to="{ name: 'demo' }">demo</NuxtLinkLocale>
    <span> • </span>
    <NuxtLinkLocale :to="{ name: 'index' }">home</NuxtLinkLocale>
    <span> • </span>
    <NuxtLinkLocale :to="{ name: 'about' }">about</NuxtLinkLocale>
  </span>
</template>

<!-- scoped component styles -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles -->
<style lang="scss"></style>
