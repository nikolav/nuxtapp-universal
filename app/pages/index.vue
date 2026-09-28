<script setup lang="ts">
definePageMeta({
  title: "pages.index.title",
  description: "pages.index.description",
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
  <AppBoxBase class="page--index">
    <h2>page:home</h2>
  </AppBoxBase>
</template>
