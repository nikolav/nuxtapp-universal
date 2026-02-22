<script setup lang="ts">
import { useDoc } from "~/composables/doc/use-doc";
import { useDocs } from "~/composables/docs/use-docs";
import { useOnceMounted } from "~/composables/utils/use-once-mounted-on";
import { onDebug } from "~/utils/on-debug";

definePageMeta({
  layout: "default",
});

const ls = useDocs("foos");
const lsCommit = () => {
  ls.commit({ x: Math.random() });
};

useOnceMounted([], () => {
  ls.start();
});

// 76979871
// DyXl4c2XN-o
// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <h2>page:demo</h2>
    <div class="space-x-2 ms-2">
      <button @click="lsCommit">ls:commit</button>
    </div>
    <div>
      <small>
        <pre>processing: [{{ ls.ps.processing.value }}]</pre>
        <pre>success: [{{ ls.ps.success.value }}]</pre>
        <pre>error: [{{ ls.ps.error.value }}]</pre>
        <pre>data: [{{ ls.data.value }}]</pre>
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
