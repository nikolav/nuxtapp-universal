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
    <VCard width="320" height="240" class="d-flex flex-col">
      <VCardText>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit quae cum
          consequatur repellat, facere nihil excepturi, incidunt laudantium
          necessitatibus magni praesentium perferendis.
        </p>
      </VCardText>
      <VSpacer />
      <VCardActions class="justify-end">
        <VBtn>ok</VBtn>
      </VCardActions>
    </VCard>
  </div>
</template>
