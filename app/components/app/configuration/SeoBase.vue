<script setup lang="ts">
const route = useRoute();
const { $$ } = useNuxtApp();
const { t } = useI18n();
const seoLocaleHead = useLocaleHead();

const title = computed(() =>
  t(`${$$.get(route.meta, "context.title", "@@TBD")}`),
);
const description = computed(() =>
  t(`${$$.get(route.meta, "context.description", "@@TBD")}`),
);

useHead(() => ({
  htmlAttrs: {
    lang: seoLocaleHead.value.htmlAttrs.lang,
    dir: seoLocaleHead.value.htmlAttrs.dir,
  },
  link: [...(seoLocaleHead.value.link || [])],
  meta: [...(seoLocaleHead.value.meta || [])],
}));

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: $$.config("public.siteSeoImage"),
  twitterCard: "summary_large_image",
});

// @@eos
</script>

<template>
  <slot />
</template>
