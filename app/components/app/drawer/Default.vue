<script setup lang="ts">
import { useDisplay } from "vuetify";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    defaultWidth?: number;
    showClose?: boolean;
    propsClose?: any;
  }>(),
  {
    defaultWidth: 422,
    showClose: true,
  },
);

const emit = defineEmits<{
  "update:model-value": [isActive: boolean];
}>();

const isActive = defineModel({ default: false });

const closeClasses = "position-fixed top-1 z-[1]";
const { $$ } = useNuxtApp();
const { smAndUp, width: vw } = useDisplay();
const close = () => {
  emit("update:model-value", false);
};

// @@eos
</script>

<template>
  <Teleport to="body" class="component--AppDrawerDefault">
    <VNavigationDrawer
      id="drawer-default"
      location="end"
      temporary
      :order="-1"
      :width="smAndUp ? $$.Math.min(vw, props.defaultWidth) : vw"
      v-model="isActive"
      v-bind="$attrs"
    >
      <VSheet tile elevation="0" class="app-container-reset position-relative">
        <slot name="close" :close :closeClasses>
          <VBtn
            v-if="props.showClose"
            variant="plain"
            icon
            rounded="full"
            color="on-surface"
            :class="[closeClasses, 'end-2']"
            @click="close"
            v-bind="props.propsClose"
          >
            <IconX icon="$close" size="1.88rem" />
          </VBtn>
        </slot>
        <slot />
      </VSheet>
    </VNavigationDrawer>
  </Teleport>
</template>

<!-- scoped component styles -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles -->
<style lang="scss"></style>
