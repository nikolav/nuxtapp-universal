<script setup lang="ts">
import { useOnceMounted } from "~/composables/utils/use-once-mounted-on";
import { useAuth } from "~/stores/use-auth.store";
import { onDebug } from "~/utils/on-debug";

definePageMeta({
  layout: "default",
});

useOnceMounted([], () => {
  onDebug({ "page-init:demo": true });
});

const auth = useAuth();

const ok = async () => {
  console.log(await useNuxtApp().$appwrite.account.get());
};

// 76979871
// DyXl4c2XN-o
// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <h1>page:demo</h1>
    <div class="space-x-2 ms-2">
      <button
        @click="
          auth.authenticate({
            email: 'admin@nikolav.rs',
            password: 'admin@nikolav.rs',
          })
        "
      >
        login
      </button>
      <button @click="auth.logout()">logout</button>
      <button @click="ok">ok</button>
    </div>
    <div>
      <small>
        <pre>
        isAuth:  [{{ auth.isAuth }}]
        account: [{{ auth.account }}]
      </pre
        >
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
