<script setup lang="ts">
const props = withDefaults(defineProps<{ propsSheet?: any }>(), {
  propsSheet: {},
});
// @@eos
</script>

<template>
  <VDialog
    fullscreen
    :scrim="false"
    transition="app-transition-slide-y-r"
    attach="body"
  >
    <VSheet
      tile
      elevation="0"
      class="app-container-reset"
      v-bind="props.propsSheet"
    >
      <slot />
    </VSheet>
  </VDialog>
</template>

<!-- scoped component styles -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles -->
<style lang="scss"></style>
