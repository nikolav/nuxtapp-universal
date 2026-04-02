<script setup lang="ts">
// @@eos
</script>
<template>
  <VMain>
    <NuxtLinkLocale :to="{ name: 'demo' }">demo</NuxtLinkLocale>
    <span> | </span>
    <NuxtLinkLocale :to="{ name: 'index' }">home</NuxtLinkLocale>
    <span> | </span>
    <NuxtLinkLocale :to="{ name: 'about' }">about</NuxtLinkLocale>
    <slot />
  </VMain>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
