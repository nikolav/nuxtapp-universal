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

useOnceMountedOn([() => auth.isAuth], () => {
  cached.start();
});

const cacheCommit = () => {
  cached.commit({ x: Math.random() });
};
const cacheDrop = () => {
  cached.rm("x");
};

// @@eos
</script>

<template>
  <section class="app-container-reset page--index">
    <div class="space-x-2 ms-2">
      <button @click="cacheCommit">cached:commit</button>
      <button @click="cacheDrop">cached:drop</button>
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
        <pre>
          cached.processing: [{{ cached.ps.processing.value }}]
          cached.success:    [{{ cached.ps.success.value }}]
          cached.error:      [{{ cached.ps.error.value }}]
          cached.data:  [{{ cached.data.value }}]
          •
          account:      [{{ auth.account }}]
        </pre>
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
