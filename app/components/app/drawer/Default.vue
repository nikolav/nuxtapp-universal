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

const { $$ } = useNuxtApp();
const { smAndUp, width: vw } = useDisplay();

const isActive = defineModel({ default: false });

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
      <VSheet
        tile
        rounded="0"
        class="app-container-reset position-relative"
        height="100%"
      >
        <VBtn
          v-if="props.showClose"
          variant="plain"
          icon
          rounded="full"
          color="on-surface"
          class="position-fixed top-1 end-2 z-[1]"
          @click="isActive = false"
          v-bind="props.propsClose"
        >
          <IconX icon="$close" size="1.88rem" />
        </VBtn>
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
