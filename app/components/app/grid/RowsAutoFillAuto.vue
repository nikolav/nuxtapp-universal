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
    class="component--AppGridRowsAutoFillAuto app-container-reset grid grid-cols-1 grid-rows-auto-fill-auto"
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
