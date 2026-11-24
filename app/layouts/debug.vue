<script setup lang="ts">
import { useDisplay, useTheme } from "vuetify";

const theme = useTheme();
const d = useDisplay();
// @@eos
</script>
<template>
  <AppBoxLayoutWrap class="layout--debug">
    <VMain>
      <AppBoxFlex>
        <AppNavLine />
        <VSpacer />
        <AppBoxFlex center class="gap-2 text-sm">
          <span>{{ theme.global.name.value }}, </span>
          <span>{{ d.name.value }}, </span>
          <pre>[{{ d.width.value }}x{{ d.height.value }}]</pre>
        </AppBoxFlex>
      </AppBoxFlex>
      <hr />
      <slot />
    </VMain>
  </AppBoxLayoutWrap>
</template>
