<script setup lang="ts">
// @@eos
</script>

<template>
  <div class="app-container-reset component--AppNavPageLinks">
    <div class="flex justify-center">
      <NuxtLinkLocale :to="{ name: 'demo' }">demo</NuxtLinkLocale>
      <span> | </span>
      <NuxtLinkLocale :to="{ name: 'index' }">home</NuxtLinkLocale>
      <span> | </span>
      <NuxtLinkLocale :to="{ name: 'about' }">about</NuxtLinkLocale>
      <span> | </span>
      <NuxtLinkLocale :to="{ name: 'dashboard' }">dashboard</NuxtLinkLocale>
      <span> | </span>
      <NuxtLinkLocale :to="{ name: 'auth' }">auth</NuxtLinkLocale>
    </div>
  </div>
</template>
