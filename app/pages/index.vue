<script setup lang="ts">
import { useDoc } from "~/composables/doc/use-doc";

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

const client = useDoc("foo:1");
const push = () => {
  client.push({ foo: Math.random(), bar: Math.random(), x: { a: 1 } });
};
const drop = () => {
  client.drop("foo", "x.a");
};


// @@eos
</script>

<template>
  <section class="app-container-reset page--index">
    <div class="space-x-4 px-2">
      <button @click="push">cache:add</button>
      <button @click="drop">cache:drop</button>
    </div>
    <div>
      <small>
        <pre>processing: [{{ client.ps.processing }}]</pre>
        <pre>success:    [{{ client.ps.success }}]</pre>
        <pre>error:      [{{ client.ps.error }}]</pre>
        <pre>data: [{{ client.cache.data.value }}]</pre>
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
