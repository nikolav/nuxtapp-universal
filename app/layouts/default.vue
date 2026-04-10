<script setup lang="ts">
const { $$ } = useNuxtApp();

const showAppBar = computed(
  () => false !== $$.get(useRoute().meta, "context.showAppBar"),
);
const showFooterMain = computed(
  () => false !== $$.get(useRoute().meta, "context.showFooterMain"),
);
// @@eos
</script>
<template>
  <VMain>
    <AppNavMain v-if="showAppBar" />
    <slot />
  </VMain>
  <AppFooterMain v-if="showFooterMain" />
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
