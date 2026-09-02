<script setup lang="ts">
import type { TOrNoValue, TVueInstance } from "~/types";
import type { default as TAppBoxBase } from "~/components/app/box/Base.vue";

const target = useTemplateRef<TOrNoValue<InstanceType<typeof TAppBoxBase>>>(
  "target-945b03c3-ef77-56ae-9208-04ce7c28ca20",
);

const el_ = useCurrentElement((<unknown>target) as TVueInstance);
const elSize = useElementSize(el_);

const exposed = { ...elSize };

defineExpose(exposed);

// @@eos
</script>

<template>
  <AppBoxBase
    class="component--AppProvidesElementSize"
    ref="target-945b03c3-ef77-56ae-9208-04ce7c28ca20"
  >
    <slot v-bind="elSize" />
  </AppBoxBase>
</template>
