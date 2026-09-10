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
    <VAlert tile variant="flat" color="primary" prominent>
      <template #prepend>
        <IconX icon="mdi:home" size="1.5rem" />
      </template>
      page:home
    </VAlert>
  </AppBoxPageWrap>
</template>
