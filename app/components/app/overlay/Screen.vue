<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{ propsSheet?: any }>(), {
  propsSheet: {},
});
// @@eos
</script>

<template>
  <ClientOnly>
    <VDialog
      fullscreen
      :scrim="false"
      transition="app-transition-slide-y-r"
      v-bind="$attrs"
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
  </ClientOnly>
</template>

<!-- scoped component styles -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles -->
<style lang="scss"></style>
