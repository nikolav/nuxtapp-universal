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
  <AppBoxPageWrap class="page--index">
    <AppBoxBase>
      <h2>page:home</h2>
    </AppBoxBase>
  </AppBoxPageWrap>
</template>
