<script setup lang="ts">
definePageMeta({
  layout: "debug",
  middleware: ["guest"],
  // validate: (route) => {},
  i18n: {
    // locales: ["sr", "en"],
    paths: {
      sr: "/prijava",
      "sr-cyrl": "/prijava",
      en: "/auth",
    },
  },
  context: {
    title: "pages.auth.title",
    description: "pages.auth.description",
  },
});
// @@eos
</script>

<template>
  <AppBoxPageWrap class="page--auth">
    <h2>page:auth</h2>
  </AppBoxPageWrap>
</template>
