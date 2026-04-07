<script setup lang="ts">
// defineOptions({
//   name: "COMPONENT_NAME",
//   inheritAttrs: false,
// });
definePageMeta({
  context: {
    title: "pages.dashboard.title",
    description: "pages.dashboard.description",
  },
  layout: "default",
  middleware: ["authenticated"],
  i18n: {
    paths: {
      sr: "/panel",
      "sr-cyrl": "/panel",
      en: "/dashboard",
    },
  },
});

// @@eos
</script>

<template>
  <div class="app-container-reset page--dashboard">
    <h2>page:dashboard</h2>
  </div>
</template>

<!-- scoped component styles -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles -->
<style lang="scss"></style>
