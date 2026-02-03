<script setup lang="ts">
import { useAuth } from "~/stores";
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

const auth = useAuth();
// @@eos
</script>

<template>
  <section class="app-container-reset page--index">
    <div class="flex justify-center gap-4">
      <button
        @click="
          auth.register({
            email: 'u1@user.com',
            password: 'u1@user.com',
          })
        "
      >
        auth:register
      </button>
      <button
        @click="
          auth.authenticate({
            email: 'u1@user.com',
            password: 'u1@user.com',
          })
        "
      >
        auth:authenticate
      </button>
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
