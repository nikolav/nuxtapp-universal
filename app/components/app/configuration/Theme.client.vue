<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();

const themeStored = useLocalStorage(useAppConfig().theme.THEME_ACTIVE, "");
// @theme store
watch(
  () => theme.global.name.value,
  (theme_) => {
    themeStored.value = theme_;
  },
);

const {
  theme: { darkRootClass },
} = useAppConfig();
const themeIsDark = computed(() => theme.global.current.value.dark);

// @boot;
onNuxtReady(() => {
  callOnce(() => {
    // use cached theme
    theme.change(themeStored.value);
  });
});

useHead({
  htmlAttrs: {
    class: { [darkRootClass]: themeIsDark },
  },
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
