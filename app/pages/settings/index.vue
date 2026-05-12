<script setup lang="ts">
definePageMeta({
  context: {
    title: "pages.settings.title",
    description: "pages.settings.description",
  },
  layout: "default",
  middleware: ["authenticated"],
  i18n: {
    paths: {
      sr: "/podesavanja",
      "sr-cyrl": "/podesavanja",
      en: "/settings",
    },
  },
});

// @@eos
</script>

<template>
  <div class="app-container-reset page--settings">
    <h2>page:settings</h2>
  </div>
</template>

<!-- scoped component styles -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles -->
<style lang="scss"></style>
