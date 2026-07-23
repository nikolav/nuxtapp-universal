<script setup lang="ts">
const props = defineProps<{
  propsLeft?: any;
  propsRight?: any;
}>();

// @@eos
</script>

<template>
  <div
    class="app-container-reset component--AppGridColsFullFull grid grid-rows-1 cols-fill-fill"
  >
    <div class="app-container-reset" v-bind="props.propsLeft">
      <slot name="left" />
    </div>
    <div class="app-container-reset" v-bind="props.propsRight">
      <slot name="right" />
    </div>
  </div>
</template>

<!-- scoped component styles -->
<style lang="scss" scoped>
.cols-fill-fill {
  grid-template-columns: 1fr 1fr;
}
</style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles -->
<style lang="scss"></style>
