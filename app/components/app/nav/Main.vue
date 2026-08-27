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
  </div>
</template>
