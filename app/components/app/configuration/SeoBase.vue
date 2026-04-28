<script setup lang="ts">
const route = useRoute();
const seoLocaleHead = useLocaleHead();
const { t } = useI18n();
const { $$ } = useNuxtApp();

const title = computed(() =>
  t(<string>$$.get(route.meta, "context.title", "#TBD")),
);
const description = computed(() =>
  t(<string>$$.get(route.meta, "context.description", "#TBD")),
);

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: useRuntimeConfig().public.siteSeoImage,
  twitterCard: "summary_large_image",
});

// @@eos
</script>

<template>
  <Html
    :lang="seoLocaleHead.htmlAttrs.lang"
    :dir="seoLocaleHead.htmlAttrs.dir"
  />
  <Title>{{ title }}</Title>
  <Link
    v-for="link in seoLocaleHead.link"
    :key="link.key"
    :id="link.key"
    :rel="link.rel"
    :href="link.href"
    :hreflang="link.hreflang"
  />
  <Meta
    v-for="meta in seoLocaleHead.meta"
    :key="meta.key"
    :id="meta.key"
    :property="meta.property"
    :content="meta.content"
  />
  <slot />
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
