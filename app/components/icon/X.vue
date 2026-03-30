<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{ icon: any }>();

const { $$ } = useNuxtApp();

const isRenderFN = computed(() => !$$.isString(props.icon));
const isVuetifyIcon = computed(
  () => !isRenderFN.value && String(props.icon).startsWith("$"),
);
// @@eos
</script>
<template>
  <component v-if="isRenderFN" :is="props.icon" v-bind="$attrs" />
  <VIcon v-else-if="isVuetifyIcon" :icon="props.icon" v-bind="$attrs" />
  <NuxtIcon v-else :name="props.icon" v-bind="$attrs" />
</template>
