<script setup lang="ts">
// ## imports, external, internal
// ## config:const
// ## nuxt:core
const { analyticsEnabled, gtmId: GTMID } = useRuntimeConfig().public;
// ## props / emits / v-model / v-model helper
// ## page-meta, macros
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
const { finalizePendingLocaleChange } = useI18n();
// ## handlers
// ## watch
// ## hooks / lifecycle
// init app-monted flag
// ## head / meta
// ## provide / expose
// ## io, events, websockets

// @@eos
</script>

<template>
  <section class="app-container-reset app--root">
    <!-- Google Tag Manager --noscript -->
    <Body v-if="analyticsEnabled">
      <noscript
        ><iframe
          :src="`https://www.googletagmanager.com/ns.html?id=${GTMID}`"
          height="0"
          width="0"
          style="display: none; visibility: hidden"
        ></iframe
      ></noscript>
    </Body>

    <!-- head seo metadata for locale  -->
    <AppSeoCoreLocale />

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
