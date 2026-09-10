<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    stack?: boolean;
    invert?: boolean;
    colsClass?: string;

    propsMedia?: any;
    propsText?: any;
  }>(),
  {
    stack: false,
    colsClass: "grid-cols-2",
  },
);

// @@eos
</script>

<template>
  <AppBoxBase
    class="component--AppGridTwoCells"
    :class="[props.stack ? undefined : `grid ${props.colsClass}`]"
  >
    <AppBoxBase
      :class="
        props.stack ? undefined : props.invert ? 'order-last' : 'order-first'
      "
      v-bind="props.propsMedia"
    >
      <slot name="media" />
    </AppBoxBase>
    <AppBoxBase
      :class="
        props.stack ? undefined : props.invert ? 'order-first' : 'order-last'
      "
      v-bind="props.propsText"
    >
      <slot name="text" />
    </AppBoxBase>
  </AppBoxBase>
</template>
