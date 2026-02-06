<script setup lang="ts">
const route = useRoute();
const seoLocaleHead = useLocaleHead();
const { t } = useI18n();

const title = computed(() => t(String(route.meta.title ?? "#TBD")));
const description = computed(() => t(String(route.meta.description ?? "#TBD")));

useSeoMeta({
  title,
  description,
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
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
