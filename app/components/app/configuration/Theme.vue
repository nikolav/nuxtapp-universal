<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();

const {
  theme: { darkRootClass },
} = useAppConfig();

const preferredDark = usePreferredDark();
watchEffect(() => {
  theme.change(preferredDark.value ? "dark" : "light");
});

// @@eos
</script>

<template>
  <Html
    :class="{
      [`${darkRootClass}`]: preferredDark,
    }"
  />
  <slot />
</template>
