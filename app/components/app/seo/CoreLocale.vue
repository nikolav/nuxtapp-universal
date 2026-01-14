<script setup lang="ts">
const route = useRoute();
const i18nHead = useLocaleHead();
const { t } = useI18n();

const title = computed(() => t(String(route.meta.title ?? "#TBD")));
const description = computed(() => t(String(route.meta.description ?? "#TBD")));

useSeoMeta({
  title,
  description,
});

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
}));

// @@eos
</script>

<template>
  <slot />
</template>
