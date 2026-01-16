<script setup lang="ts">
// ## imports, external, internal
import { TOKEN_appEmitter$ } from "~/keys";
// ## config:const
// ## nuxt:core
// ## props / emits / v-model / v-model helper
// ## page-meta, macros
definePageMeta({
  title: "pages.index.title",
  description: "pages.index.description",
  layout: "default",
  i18n: {
    paths: {
      sr: "/dobrodosli",
      en: "/welcome",
    },
  },
});
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
// ## head / meta
// ## provide / expose
// ## io, events, websockets

const emitter$ = inject(TOKEN_appEmitter$);
const ok = () => {
  console.log(Date.now());
  emitter$?.next({ type: "foo", payload: 122 });
};

// @@eos
</script>

<template>
  <section class="app-container-reset page--index">
    <AppVBtn @click="ok">ok</AppVBtn>
    <VBtn @click="ok">ok</VBtn>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
