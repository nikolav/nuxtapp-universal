<script setup lang="ts">
import { useDocs } from "~/composables/docs/use-docs";
import { useOnceMountedOn } from "~/composables/utils/use-once-mounted-on";
import { useAuth } from "~/stores/use-auth.store";

definePageMeta({
  layout: "default",
});

const auth = useAuth();
const { $$ } = useNuxtApp();

const ls = useDocs("foo:1");
const push = () => {
  ls.commit({ id: 18, x: $$.nanoid() }, { x: $$.nanoid() });
};
const pull = () => {
  ls.pull();
};
const rm = () => {
  ls.rm(19);
};

useOnceMountedOn([() => auth.isAuth], async () => {
  await ls.start();
});
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
      <button @click="push">ls:commit</button>
      <button @click="ls.rm(18)">ls:rm</button>
      <button @click="ls.pull()">ls:pull</button>
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
