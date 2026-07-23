<script setup lang="ts">
const props = defineProps<{
  propsBody?: any;
  propsTop?: any;
  propsBottom?: any;
}>();

// @@eos
</script>

<template>
  <div
    class="component--AppGridRowsAutoFullAuto app-container-reset grid grid-cols-1 rows-auto-fill-auto"
  >
    <div class="app-container-reset" v-bind="props.propsTop">
      <slot name="top" />
    </div>
    <div class="app-container-reset" v-bind="props.propsBody">
      <slot />
    </div>
    <div class="app-container-reset" v-bind="props.propsBottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rows-auto-fill-auto {
  grid-template-rows: auto 1fr auto;
}
</style>
