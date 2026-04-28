<script setup lang="ts">
import { useDoc } from "~/composables/doc/use-doc";
import { useOnceMounted } from "~/composables/utils/use-once-mounted-on";

const docFoo1 = useDoc("foo:1");

useOnceMounted([], () => {
  docFoo1.start();
});

// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <h1>page:demo</h1>
    <div>
      <small>
        <pre>data: [{{ docFoo1.data.value }}]</pre>
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
