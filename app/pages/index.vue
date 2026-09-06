<script setup lang="ts">
import { useTheme } from "vuetify";

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
  <AppBoxPageWrap class="page--index">
    <h2>page:home</h2>
  </AppBoxPageWrap>
</template>
