<script setup lang="ts">
const route = useRoute();
const head = useLocaleHead();

const { t } = useI18n();
const title = computed(() => t(String(route.meta.title ?? "TBD")));

// @@eos
</script>

<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir" />
  <Title>{{ title }}</Title>
  <Link
    v-for="link in head.link"
    :key="link.key"
    :id="link.key"
    :rel="link.rel"
    :href="link.href"
    :hreflang="link.hreflang"
  />
  <Meta
    v-for="meta in head.meta"
    :key="meta.key"
    :id="meta.key"
    :property="meta.property"
    :content="meta.content"
  />
  <slot />
</template>
