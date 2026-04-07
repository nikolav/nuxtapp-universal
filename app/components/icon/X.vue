<script setup lang="ts">
import { useDefaults } from "vuetify";

defineOptions({
  inheritAttrs: false,
});
const _props_ = defineProps<{ icon: any; size?: any }>();
const props = useDefaults(_props_, "IconX");

const { $$ } = useNuxtApp();

const isRenderFN = computed(() => !$$.isString(props.icon));
const isVuetifyIcon = computed(
  () => !isRenderFN.value && String(props.icon).startsWith("$"),
);
// @@eos
</script>
<template>
  <component
    v-if="isRenderFN"
    :is="props.icon"
    :size="props.size"
    v-bind="$attrs"
  />
  <VIcon
    v-else-if="isVuetifyIcon"
    :icon="props.icon"
    :size="props.size"
    v-bind="$attrs"
  />
  <NuxtIcon v-else :name="props.icon" :size="props.size" v-bind="$attrs" />
</template>
