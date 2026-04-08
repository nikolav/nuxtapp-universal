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
    <slot />
  </VMain>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
