<script setup lang="ts">
import { useGravatars } from "~/stores/use-gravatars.store";
import { useOnceMounted } from "~/composables/utils/use-once-mounted-on";

const g = useGravatars();

useOnceMounted([], () => {
  g.start();
});

// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <h2>page:demo</h2>
    <div class="flex justify-center gap-4">
      <AppBtnDefault @click="() => g.enable(true)">enable</AppBtnDefault>
      <AppBtnDefault @click="() => g.enable(false)">disable</AppBtnDefault>
      <VBtn @click="() => g.refresh()">refresh</VBtn>
    </div>
    <div class="flex justify-center pa-2">
      <VAvatar :size="54" :image="g.src" v-if="g.enabled" />
    </div>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
