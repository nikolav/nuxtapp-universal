<script setup lang="ts">
definePageMeta({
  context: {
    title: "pages.index.title",
    description: "pages.index.description",
  },
  layout: "default",
  i18n: {
    paths: {
      sr: "/dobrodosli",
      "sr-cyrl": "/dobrodosli",
      en: "/welcome",
    },
  },
});

// @@eos
</script>

<template>
  <section class="app-container-reset page--index">
    <AppMyLinks class="p-4 space-y-4" />
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
