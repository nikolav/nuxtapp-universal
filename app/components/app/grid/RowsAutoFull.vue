<script setup lang="ts">
const props = defineProps<{
  propsTop?: any;
  propsBottom?: any;
}>();

// @@eos
</script>

<template>
  <div
    class="app-container-reset component--AppGridRowsAutoFull grid grid-cols-1 rows-auto-fill gap-0"
  >
    <div class="app-container-reset" v-bind="props.propsTop">
      <slot name="top" />
    </div>
    <div class="app-container-reset" v-bind="props.propsBottom">
      <slot />
    </div>
  </div>
</template>

<!-- scoped component styles -->
<style lang="scss" scoped>
.rows-auto-fill {
  grid-template-rows: auto 1fr;
}
</style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles -->
<style lang="scss"></style>
