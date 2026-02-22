<script setup lang="ts">
import { useOnceMounted } from "~/composables/utils/use-once-mounted-on";
import { onDebug } from "~/utils/on-debug";

definePageMeta({
  layout: "default",
});

useOnceMounted([], () => {
  onDebug({ "page-init:demo": true });
});

// 76979871
// DyXl4c2XN-o
// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <h2>page:demo</h2>
    <div>
      <AppVBtn>ok</AppVBtn>
      <VBtn>ok</VBtn>
    </div>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
