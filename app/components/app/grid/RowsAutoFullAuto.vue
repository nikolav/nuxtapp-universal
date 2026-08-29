<script setup lang="ts">
const props = defineProps<{
  propsBody?: any;
  propsTop?: any;
  propsBottom?: any;
}>();

// @@eos
</script>

<template>
  <AppBoxBase
    class="component--AppGridRowsAutoFullAuto grid grid-cols-1 grid-rows-[auto_1fr_auto]"
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
