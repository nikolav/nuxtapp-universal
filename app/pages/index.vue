<script setup lang="ts">
// ## imports, external, internal
import { useAuth } from "~/stores";
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
      sr: "/",
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

const auth = useAuth();

// @@eos
</script>

<template>
  <section class="app-container-reset page--index">
    <div class="flex justify-center gap-4">
      <button
        @click="
          auth.authenticate({
            email: 'admin@nikolav.rs',
            password: 'admin@nikolav.rs',
          })
        "
      >
        auth:login
      </button>
      <button
        @click="
          auth.register({
            email: 'admin@nikolav.rs',
            password: 'admin@nikolav.rs',
          })
        "
      >
        auth:register
      </button>
      <button @click="auth.logout()">auth:logout</button>
    </div>
    <div>
      <small>
        <pre>{{ auth.account }}</pre>
      </small>
    </div>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
