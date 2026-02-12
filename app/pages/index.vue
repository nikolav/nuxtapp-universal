<script setup lang="ts">
import { useOnceMountedOn } from "~/composables/utils/use-once-mounted-on";

definePageMeta({
  title: "pages.index.title",
  description: "pages.index.description",
  layout: "default",
  i18n: {
    paths: {
      sr: "/dobrodosli",
      en: "/welcome",
    },
  },
});
// 76979871
// DyXl4c2XN-o
// @@eos
</script>

<template>
  <section class="app-container-reset page--index">
    <AppVideoPlayer
      provider="vimeo"
      :sources="[{ src: '76979871' }]"
    />
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
