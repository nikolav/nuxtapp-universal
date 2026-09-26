<script setup lang="ts">
definePageMeta({
  layout: "debug",
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
    <AppBoxItem
      :props-prepend="{
        class: 'd-flex items-center',
      }"
    >
      <template #prepend>
        <span>🚧</span>
      </template>
      <h2>page:home</h2>
    </AppBoxItem>
  </AppBoxPageWrap>
</template>
