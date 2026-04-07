<script setup lang="ts">
// defineOptions({
//   name: "COMPONENT_NAME",
//   inheritAttrs: false,
// });
definePageMeta({
  context: {
    title: "pages.auth.title",
    description: "pages.auth.description",
  },
  layout: "default",
  middleware: ["guest"],
  i18n: {
    paths: {
      sr: "/prijava",
      "sr-cyrl": "/prijava",
      en: "/auth",
    },
  },
});

// @@eos
</script>

<template>
  <div class="app-container-reset page--auth">
    <h2>page:auth</h2>
  </div>
</template>

<!-- scoped component styles -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles -->
<style lang="scss"></style>
