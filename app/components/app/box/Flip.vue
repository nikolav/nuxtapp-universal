<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    flip?: boolean;
    duration?: any;
    transform?: string;

    propsWrap?: any;
    propsFront?: any;
    propsBack?: any;
  }>(),
  {
    duration: 240,
    transform: "rotateY(180deg)",
  },
);

const { $$ } = useNuxtApp();

const td = computed(() =>
  $$.isNumeric(props.duration) ? `${props.duration}ms` : props.duration,
);
const t = computed(() => props.transform);

// @@eos
</script>

<template>
  <AppBoxBase class="component--AppBoxFlip perspective-[600px]">
    <AppBoxBase
      class="![isolation:auto] position-relative w-100 fill-height transition-transform transition-duration-x [transform-style:preserve-3d]"
      :class="{ 'transformation-x': props.flip }"
      v-bind="props.propsWrap"
    >
      <AppBoxBase
        class="position-absolute w-100 fill-height [backface-visibility:hidden]"
        v-bind="props.propsFront"
      >
        <slot name="front" />
      </AppBoxBase>
      <AppBoxBase
        class="position-absolute w-100 fill-height [backface-visibility:hidden] transformation-x"
        v-bind="props.propsBack"
      >
        <slot name="back" />
      </AppBoxBase>
    </AppBoxBase>
  </AppBoxBase>
</template>

<style lang="scss" scoped>
.transition-duration-x {
  transition-duration: v-bind(td) !important;
}
.transformation-x {
  transform: v-bind(t);
}
</style>
