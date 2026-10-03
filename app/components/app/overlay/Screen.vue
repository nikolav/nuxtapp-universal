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
        class="app-container-reset position-relative"
        v-bind="props.propsSheet"
      >
        <slot />
      </VSheet>
    </VDialog>
  </ClientOnly>
</template>
