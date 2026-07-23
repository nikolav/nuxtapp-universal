<script setup lang="ts">
// defineOptions({
//   name: "COMPONENT_NAME",
//   inheritAttrs: false,
// });

const props = defineProps<{
  propsTop?: any;
  propsBottom?: any;
}>();

// @@eos
</script>

<template>
  <div
    class="component--AppGridRowsFullFull app-container-reset grid grid-cols-1 rows-fill-fill gap-0"
  >
    <div class="app-container-reset" v-bind="props.propsTop">
      <slot name="top" />
    </div>
    <div class="app-container-reset" v-bind="props.propsBottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<!-- scoped component styles -->
<style lang="scss" scoped>
.rows-fill-fill {
  grid-template-rows: 1fr 1fr;
}
</style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles -->
<style lang="scss"></style>
