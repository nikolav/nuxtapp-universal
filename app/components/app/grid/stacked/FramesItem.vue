<script setup lang="ts">
import type { TAppGridStackedFramesContext } from "~/types";

const cx = inject<TAppGridStackedFramesContext>("AppGridStackedFrames_context");
const _stack_ = computed(() => Boolean(toValue(cx?.stack)));

// @@eos
</script>

<template>
  <AppBoxBase
    class="component--AppGridStackedFramesItem"
    :class="{ 'app-grid-stacked-frames-item': _stack_ }"
  >
    <slot />
  </AppBoxBase>
</template>

<style lang="scss" scoped>
.app-grid-stacked-frames-item {
  grid-area: stack;
}
</style>
