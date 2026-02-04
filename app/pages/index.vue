<script setup lang="ts">
import { useAsyncGraphqlData } from "~/composables/request";
import { Q_status } from "~/graphql";

definePageMeta({
  title: "pages.index.title",
  description: "pages.index.description",
  layout: "default",
  i18n: {
    paths: {
      sr: "/",
      en: "/welcome",
    },
  },
});

const { data } = await useAsyncGraphqlData({
  key: "Q_status",
  document: Q_status,
});

// @@eos
</script>

<template>
  <section class="app-container-reset page--index">
    <div>
      <small>
        <pre>{{ data }}</pre>
      </small>
    </div>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
