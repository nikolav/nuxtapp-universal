<script setup lang="ts">
import { useDoc } from "~/composables/doc/use-doc";
import { useOnceMounted } from "~/composables/utils/use-once-mounted-on";
import { useAuth } from "~/stores/use-auth.store";
import { onDebug } from "~/utils/on-debug";

definePageMeta({
  layout: "default",
});

const { $$ } = useNuxtApp();
const auth = useAuth();
const d = useDoc("foo:x1");
const docPush = () => {
  d.commit({ foo: $$.nanoid(), "x:1": Math.random() });
};
const docRm = () => {
  d.rm("foo");
};

useOnceMounted([], () => {
  onDebug({ "page-init:demo": true });
  d.start();
});

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
      <button @click="docPush">doc:push</button>
      <button @click="docRm">doc:rm</button>
    </div>
    <div>
      <small>
        <pre>data: [{{ d.data.value }}]</pre>
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
