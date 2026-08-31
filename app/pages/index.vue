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
  <AppBoxPageWrap class="page--index fill-height">
    <AppBoxFlex center class="fill-height">
      <strong class="text-xl">🚧</strong>
    </AppBoxFlex>
  </AppBoxPageWrap>
</template>
