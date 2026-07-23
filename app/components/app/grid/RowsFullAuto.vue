<script setup lang="ts">
const props = defineProps<{
  propsTop?: any;
  propsBottom?: any;
}>();

// @@eos
</script>

<template>
  <div
    class="app-container-reset component--AppGridRowsFullAuto grid grid-cols-1 rows-fill-auto gap-0"
  >
    <div class="app-container-reset" v-bind="props.propsTop">
      <slot />
    </div>
    <div class="app-container-reset" v-bind="props.propsBottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<!-- scoped component styles -->
<style lang="scss" scoped>
.rows-fill-auto {
  grid-template-rows: 1fr auto;
}
</style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles -->
<style lang="scss"></style>
