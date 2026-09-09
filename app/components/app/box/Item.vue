<script setup lang="ts">
const props = defineProps<{
  propsPrepend?: any;
  propsAppend?: any;
  propsContent?: any;
}>();

// @@eos
</script>

<template>
  <AppBoxFlex>
    <AppBoxBase v-if="$slots.prepend" v-bind="props.propsPrepend">
      <slot name="prepend" />
    </AppBoxBase>
    <AppBoxBase class="flex-1" v-bind="props.propsContent">
      <slot />
    </AppBoxBase>
    <AppBoxBase v-if="$slots.append" v-bind="props.propsAppend">
      <slot name="append" />
    </AppBoxBase>
  </AppBoxFlex>
</template>
