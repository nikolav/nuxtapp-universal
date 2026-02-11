<script setup lang="ts">
import { useAuth } from "~/stores/use-auth.store";

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

const auth = useAuth();

// @@eos
</script>

<template>
  <section class="app-container-reset page--index">
    <div class="space-x-2 ps-2">
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
        <pre>isAuth:     [{{ auth.isAuth }}]</pre>
        <pre>processing: [{{ auth.status.processing }}]</pre>
        <pre>success:    [{{ auth.status.success }}]</pre>
        <pre>error:      [{{ auth.status.error }}]</pre>
        <pre>account: [{{ auth.account }}]</pre>
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
