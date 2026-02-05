<script setup lang="ts">
import { useTheme } from "vuetify";

const themeStored = useLocalStorage(useAppConfig().theme.THEME_ACTIVE, "");
const theme = useTheme();

// @theme store
watch(
  () => theme.global.name.value,
  (theme_) => {
    themeStored.value = theme_;
  },
);

// @boot;
onNuxtReady(() => {
  callOnce(() => {
    // use cached theme
    theme.change(themeStored.value);
  });
});

// @@eos
</script>

<template>
  <slot />
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
