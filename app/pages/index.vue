<script setup lang="ts">
// ## imports, external, internal
import { memory as AuthMemoryService } from "~/services/auth";
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

const token = ref<any>();
const account = ref<any>(null);
const auth = new AuthMemoryService();
const ok = () => {
  console.log({ auth });
};
const authRegister = async () => {
  const tok = await auth.register({
    email: "admin@nikolav.rs",
    password: "admin@nikolav.rs",
  });
  token.value = tok;
};

const authLogin = async () => {
  const tok = await auth.authenticate({
    email: "admin@nikolav.rs",
    password: "admin@nikolav.rs",
  });

  token.value = tok;
};

const getAccount = async () => {
  account.value = await auth.account(token.value);
};

// @@eos
</script>

<template>
  <section class="app-container-reset page--index">
    <div class="flex justify-center p-2 gap-4">
      <button @click="ok">ok</button>
      <button @click="authLogin">auth:login</button>
      <button @click="authRegister">auth:register</button>
      <button @click="getAccount">auth:register</button>
    </div>
    <div>
      <small>
        <pre>{{ account }}</pre>
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
