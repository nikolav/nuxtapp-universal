<script setup lang="ts">
const props = withDefaults(
  defineProps<{ center?: boolean; flex?: boolean; col?: boolean }>(),
  { flex: true },
);

// @@eos
</script>

<template>
  <AppBoxBase
    class="component--AppBoxFlex"
    :class="{
      flex: props.flex,
      'items-center justify-center': props.flex && props.center,
      'flex-col': props.flex && props.col,
    }"
  >
    <slot />
  </AppBoxBase>
</template>
