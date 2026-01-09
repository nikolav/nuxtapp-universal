<script setup lang="ts">
const { $$ } = useNuxtApp();
const props = defineProps<{ icon?: any }>();

const isRenderFN = computed(() => !$$.isString(props.icon));

// # adds vuetify v-icon
// const isVuetifyIcon = computed(
//   () => !isRenderFN.value && String(props.icon).startsWith("$")
// );
// <VIcon v-else-if="isVuetifyIcon" :icon="icon" v-bind="$attrs" />

// @@eos
</script>
<template>
  <component v-if="isRenderFN" :is="props.icon" v-bind="$attrs" />
  <Icon v-else :name="props.icon" v-bind="$attrs" />
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
