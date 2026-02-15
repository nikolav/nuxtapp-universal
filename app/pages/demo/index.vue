<script setup lang="ts">
import { useDocs } from "~/composables/docs/use-docs";
import { useAuth } from "~/stores/use-auth.store";

definePageMeta({
  layout: "default",
});

const auth = useAuth();

const ls = useDocs("foo:1");
const commit = () => {
  ls.commit({ id: "ID1", x: Math.random() });
};
const rm = () => {
  ls.rm("ID1");
};

// 76979871
// DyXl4c2XN-o
// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <div class="space-x-2 ms-2">
      <button
        @click="
          auth.authenticate({
            email: 'admin@nikolav.rs',
            password: 'admin@nikolav.rs',
          })
        "
      >
        authenticate
      </button>
      <button
        @click="
          auth.register({
            email: 'admin@nikolav.rs',
            password: 'admin@nikolav.rs',
          })
        "
      >
        register
      </button>
      <button @click="auth.logout()">logout</button>
      <button @click="commit">ls:push</button>
      <button @click="commit">ls:push</button>
      <button @click="rm">ls:rm</button>
    </div>
    <div>
      <small>
        <pre>data:    [{{ ls.data.value }}]</pre>
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
