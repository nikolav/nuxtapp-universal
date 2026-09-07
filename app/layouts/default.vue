<script setup lang="ts">
import { useDisplay, useTheme } from "vuetify";

const theme = useTheme();
const d = useDisplay();
// @@eos
</script>
<template>
  <VMain class="layout--default">
    <AppBoxFlex>
      <AppNavLine />
      <VSpacer />
      <AppBoxFlex class="items-center gap-2">
        <p>{{ theme.global.name.value }}</p>
        <small>
          <pre
            >{{ d.name.value }}: {{ d.width.value }}x{{ d.height.value }}</pre
          >
        </small>
      </AppBoxFlex>
    </AppBoxFlex>
    <hr />
    <slot />
  </VMain>
</template>
