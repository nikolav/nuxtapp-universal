<script setup lang="ts">
const props = defineProps<{
  propsTop?: any;
  propsBottom?: any;
  propsBody?: any;
}>();

// @@eos
</script>

<template>
  <div
    class="component--AppGridRowsFullAutoFull app-container-reset grid grid-cols-1 rows-fill-auto-fill"
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
.rows-fill-auto-fill {
  grid-template-rows: 1fr auto 1fr;
}
</style>
