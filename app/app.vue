<script setup lang="ts">
// ## imports, external, internal
import { COLOR_PRIMARY } from "~/assets/themes/colors";
// ## config:const
const {
  theme: { darkRootClass },
} = useAppConfig();
// ## nuxt:core
const { analyticsEnabled, gtmId: GTMID } = useRuntimeConfig().public;
// ## props / emits / v-model / v-model helper
// ## page-meta, macros
const route = useRoute();
const seoLocaleHead = useLocaleHead();
// defineOptions({
//   name: "COMPONENT_NAME",
//   inheritAttrs: false,
// });
// definePageMeta({
//   layout: "default",
//   // middleware: ["auth"],
//   "@page": {
//     appBarTitle: "",
//     htmlClass: "",
//     bodyClass: "",
//     appClass: "",
//   },
// });
// ## attrs / slots
// ## schemas / validation
// ## icons
// ## refs / flags / models
// ## state, pinia, local
// ## storage / cookies
// ## async data
// ## computed
// ## helpers / utils
const { finalizePendingLocaleChange, t } = useI18n();
// ## handlers
// ## watch
// ## hooks / lifecycle
// ## head / meta
const title = computed(() => t(String(route.meta.title ?? "#TBD")));
const description = computed(() => t(String(route.meta.description ?? "#TBD")));
useSeoMeta({
  title,
  description,
});

// ## provide / expose
// ## io, events, websockets

// @@eos
</script>

<template>
  <section class="app-container-reset app--root">
    <!-- toggle dark class on html -->
    <Html
      :class="{ [darkRootClass]: false }"
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

    <!-- Google Tag Manager --noscript -->
    <template v-if="analyticsEnabled">
      <noscript
        ><iframe
          :src="`https://www.googletagmanager.com/ns.html?id=${GTMID}`"
          height="0"
          width="0"
          style="display: none; visibility: hidden"
        ></iframe
      ></noscript>
    </template>

    <!-- #https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator -->
    <NuxtLoadingIndicator :color="COLOR_PRIMARY" />

    <!-- routes -->
    <NuxtLayout>
      <NuxtPage :transition="{ onBeforeEnter: finalizePendingLocaleChange }" />
    </NuxtLayout>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
