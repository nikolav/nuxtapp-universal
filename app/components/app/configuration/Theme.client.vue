<script setup lang="ts">
import { useTheme } from "vuetify";

const {
  theme: { darkRootClass },
} = useAppConfig();
const theme = useTheme();

const themeIsDark = computed(() => theme.global.current.value.dark);

// @@eos
</script>

<template>
  <Html :class="{ [darkRootClass]: themeIsDark }" />
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
