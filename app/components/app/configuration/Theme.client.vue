<script setup lang="ts">
import { useTheme } from "vuetify";

const { $$ } = useNuxtApp();

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

useHead({
  htmlAttrs: {
    class: { [darkRootClass]: themeIsDark },
  },
});

// @boot;
onNuxtReady(() => {
  $$.onDebug({ "@nuxt:ready": Date.now() });
});

// @@eos
</script>

<template>
  <slot />
</template>
