<script setup lang="ts">
const props = defineProps<{
  propsTop?: any;
  propsBottom?: any;
  propsBody?: any;
}>();

// @@eos
</script>

<template>
  <AppBoxBase
    class="component--AppGridRowsFullAutoFull grid grid-cols-1 rows-fill-auto-fill"
  >
    <AppBoxBase v-bind="props.propsTop">
      <slot name="top" />
    </AppBoxBase>
    <AppBoxBase v-bind="props.propsBody">
      <slot />
    </AppBoxBase>
    <AppBoxBase v-bind="props.propsBottom">
      <slot name="bottom" />
    </AppBoxBase>
  </AppBoxBase>
</template>

<style lang="scss" scoped>
.rows-fill-auto-fill {
  grid-template-rows: 1fr auto 1fr;
}
</style>
