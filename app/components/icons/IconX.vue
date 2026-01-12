<script setup lang="ts">
import { isVNode } from "vue";

import { schemaStringNonemptyOrRenderable } from "~/schemas";
import type { TIconProp } from "~/types";

const props = defineProps<{
  icon: TIconProp;
}>();

const { $$ } = useNuxtApp();

const resolved = computed(() => {
  try {
    const icon_ = schemaStringNonemptyOrRenderable.parse(props.icon);
    return $$.isString(icon_)
      ? icon_.startsWith("$")
        ? { kind: "vuetify" as const, value: icon_ }
        : { kind: "nuxt" as const, value: icon_ }
      : isVNode(icon_)
      ? { kind: "vnode" as const, value: icon_ }
      : { kind: "component" as const, value: icon_ };
  } catch (error) {
    $$.onDebug({ Iconx: error });
  }
  return { kind: "none" as const };
});
</script>

<template>
  <component
    v-if="'component' === resolved.kind"
    :is="resolved.value"
    v-bind="$attrs"
  />
  <component v-else-if="'vnode' === resolved.kind" :is="resolved.value" />
  <VIcon
    v-else-if="'vuetify' === resolved.kind"
    :icon="resolved.value"
    v-bind="$attrs"
  />
  <Icon
    v-else-if="'nuxt' === resolved.kind"
    :name="resolved.value"
    v-bind="$attrs"
  />
  <!-- default, render nothing -->
</template>
