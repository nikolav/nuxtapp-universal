<script setup lang="ts">
const route = useRoute();
const seoLocaleHead = useLocaleHead();
const { t } = useI18n();
const { $$ } = useNuxtApp();

const title = computed(() =>
  t(String($$.get(route.meta, "context.title", "#TBD"))),
);
const description = computed(() =>
  t(String($$.get(route.meta, "context.description", "#TBD"))),
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
