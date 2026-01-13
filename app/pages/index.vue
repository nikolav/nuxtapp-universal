<script setup lang="ts">
// ## imports, external, internal
// ## config:const
// ## nuxt:core
// ## props / emits / v-model / v-model helper
// ## page-meta, macros
definePageMeta({
  title: "pages.title.index",
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

// @@eos
</script>

<template>
  <section class="app-container-reset page--index">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Error dolorum
      nisi voluptatum odit laudantium temporibus quisquam tempore ut, expedita
      incidunt? At, quaerat dignissimos tempora assumenda blanditiis unde
      officia. Quo, nihil!
    </p>
    <div>
      <IconsIconX icon="local:logo-nikolav" />
    </div>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
