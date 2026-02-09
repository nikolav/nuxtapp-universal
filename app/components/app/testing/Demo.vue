<script setup lang="ts">
const message = ref<string>("demo");
const content = computed(() => `${message.value}!`);

// @@eos
</script>

<template>
  <section class="app-container-reset component--Demo">
    <h1>{{ content }}</h1>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
