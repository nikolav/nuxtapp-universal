<script setup lang="ts">
import type { TAppGridStackedFramesContext } from "~/types";

const props = withDefaults(
  defineProps<{
    stack?: boolean;
  }>(),
  {
    stack: true,
  },
);

const _stack_ = computed(() => props.stack);

provide("AppGridStackedFrames_context", <TAppGridStackedFramesContext>{
  stack: _stack_,
});

// @@eos
</script>

<template>
  <AppBoxBase
    class="component--AppGridStackedFrames"
    :class="{ 'grid app-grid-stacked-frames': props.stack }"
  >
    <slot />
  </AppBoxBase>
</template>

<style lang="scss" scoped>
.app-grid-stacked-frames {
  grid-template-areas: "stack";
}
</style>
