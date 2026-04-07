<script setup lang="ts">
const { $$ } = useNuxtApp();

const showAppBar = computed(
  () => false !== $$.get(useRoute().meta, "context.appBar"),
);
// @@eos
</script>
<template>
  <VMain>
    <AppNavMain v-if="showAppBar" />
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
    <slot />
  </VMain>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
