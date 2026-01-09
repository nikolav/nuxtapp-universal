<script setup lang="ts">
// ## imports, external, internal
// ## config:const
// ## nuxt:core
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
    <!-- routed pages -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- mount @client to init client flags -->
    <!-- only works with Nuxt auto-imports and #components imports -->
    <AppConfigsClient />
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
