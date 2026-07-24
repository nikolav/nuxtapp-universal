<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();
const { $$ } = useNuxtApp();

const themeStored = useLocalStorage($$.config("theme.THEME_ACTIVE")!, "");
// @theme store
watch(
  () => theme.global.name.value,
  (theme_) => {
    themeStored.value = theme_;
  },
);

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
    class: { [$$.config<string>("theme.darkRootClass ")!]: themeIsDark },
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
