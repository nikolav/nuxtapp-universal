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
const register = async () => {
  const res = await auth.register({
    email: "u1@user.com",
    password: "u1@user.com",
  });
  console.log({ res });
};
const authenticate = async () => {
  const res = await auth.authenticate({
    email: "u1@user.com",
    password: "u1@user.com",
  });
  console.log({ res });
};
// @@eos
</script>

<template>
  <section class="app-container-reset page--index">
    <div class="flex justify-center gap-4">
      <button @click="register">auth:register</button>
      <button @click="authenticate">auth:authenticate</button>
      <button @click="auth.signInWithProvider('google')">auth:google</button>
      <button @click="auth.logout()">auth:logout</button>
    </div>
    <div>
      <small>
        <pre>{{ auth.isAuth }}</pre>
      </small>
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
