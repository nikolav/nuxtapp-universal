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
  </span>
</template>
