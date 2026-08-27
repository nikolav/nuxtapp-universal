<script setup lang="ts">
const props = defineProps<{
  propsTop?: any;
  propsBottom?: any;
  propsBody?: any;
}>();

// @@eos
</script>

<template>
  <AppBoxFlex col class="component--AppGridRowsFullAutoFull">
    <AppBoxBase class="flex-1" v-bind="props.propsTop">
      <slot name="top" />
    </AppBoxBase>
    <AppBoxBase v-bind="props.propsBody">
      <slot />
    </AppBoxBase>
    <AppBoxBase class="flex-1" v-bind="props.propsBottom">
      <slot name="bottom" />
    </AppBoxBase>
  </AppBoxFlex>
</template>
