<script setup lang="ts">
definePageMeta({
  layout: "default",
  i18n: {
    paths: {
      sr: "/dobrodosli",
      "sr-cyrl": "/dobrodosli",
      en: "/welcome",
    },
  },
  context: {
    title: "pages.index.title",
    description: "pages.index.description",
  },
});

// @@eos
</script>

<template>
  <div class="app-container-reset page--index">
    <h2>page:home</h2>
  </div>
</template>
