<script setup lang="ts">
import type { TRecordJson } from "~/types";
import { useLinkedNodes } from "~/composables/state/use-linked-nodes";

const { $$ } = useNuxtApp();
const ll = useLinkedNodes<TRecordJson>({ x: 0 });
const addLink = () => {
  ll.link({ x: $$.nanoid() });
};
// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <h1>page:demo</h1>
    <div class="flex justify-center gap-2">
      <button @click="addLink">add-link</button>
      <button @click="ll.prev">prev</button>
      <button @click="ll.next">next</button>
      <button @click="ll.first">first</button>
      <button @click="ll.last">last</button>
    </div>
    <p>
      <small>
        <pre>
          index : [{{ ll.index.value }}]
          size  : [{{ ll.size.value }}]
          [{{ ll.node.value.payload }}]
        </pre>
      </small>
    </p>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
