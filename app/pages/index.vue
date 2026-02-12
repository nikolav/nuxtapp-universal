<script setup lang="ts">
import { useDoc } from "~/composables/doc/use-doc";
import { useOnceMountedOn } from "~/composables/utils/use-once-mounted-on";
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
const cached = useDoc("foo:1");

const cacheCommit = () => {
  cached.commit({ x1: Math.random(), x2: { foo: 1, bar: 2 } });
};
const cacheDrop = () => {
  cached.rm("x", "y", "z", "x2.bar");
};

useOnceMountedOn([() => auth.isAuth], () => {
  cached.start();
});

// @@eos
</script>

<template>
  <section class="app-container-reset page--index">
    <div class="space-x-2 ps-2">
      <button @click="cacheCommit">cache:commit</button>
      <button @click="cacheDrop">cache:drop</button>
      <button @click="cached.pull()">cache:pull</button>
    </div>
    <div>
      <small>
        <pre>cached: [{{ cached.data.value }}]</pre>
      </small>
    </div>
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
