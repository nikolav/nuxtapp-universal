<script setup lang="ts">
const {
  theme: { darkRootClass },
} = useAppConfig();

// @@eos
</script>

<template>
  <Html :class="{ [darkRootClass]: false }" />
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
