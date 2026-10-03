<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    auto?: boolean;
    cellWidth?: any;
  }>(),
  {
    auto: true,
    cellWidth: 100,
  },
);

const { $$ } = useNuxtApp();

const cw = computed(() =>
  $$.isNumeric(props.cellWidth) ? `${props.cellWidth}px` : props.cellWidth,
);

// @@eos
</script>

<template>
  <AppBoxBase
    class="component--AppGridAutoCells"
    :class="{ 'grid app-grid-auto-cells-cols': props.auto }"
  >
    <slot />
  </AppBoxBase>
</template>

<style lang="scss" scoped>
.app-grid-auto-cells-cols {
  grid-template-columns: repeat(auto-fit, minmax(min(v-bind(cw), 100%), 1fr));
}
</style>
