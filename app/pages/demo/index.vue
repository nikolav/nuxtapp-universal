<script setup lang="ts">
import { useStoreKeyValue } from "~/stores/use-key-value.store";

definePageMeta({
  layout: "default",
});

const d = useStoreKeyValue();
const commit = () => {
  d.commit({ foo: Math.random(), bar: Math.random() });
};
// 76979871
// DyXl4c2XN-o
// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <h1>page:demo</h1>
    <div class="flex justify-center gap-2">
      <button @click="commit">ok</button>
      <button @click="d.use('foo')">foo</button>
      <button @click="d.use('bar')">bar</button>
    </div>
    <div>
      <small>
        <pre>d: [{{ d.current }}]</pre>
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
