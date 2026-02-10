<script setup lang="ts">
import { useLocale as useLocaleVuetify } from "vuetify";
// sync vuetify locale with i18n
const { locale } = useI18n();
const { current } = useLocaleVuetify();
watch(
  locale,
  (locale) => {
    current.value = locale;
  },
  { immediate: true },
);

// @@eos
</script>

<template>
  <slot />
</template>
